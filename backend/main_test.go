// backend/main_test.go
package main

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	r.POST("/cadastro", func(c *gin.Context) {
		nome := c.PostForm("nome")
		email := c.PostForm("email")
		senha := c.PostForm("senha")
		response := CadastroResponse{
			Nome:    nome,
			Email:   email,
			Senha:   senha,
			Message: "Cadastro realizado com sucesso!",
		}
		c.JSON(200, response)
	})
	r.GET("/cadastro", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"cadastros": []gin.H{
				{
					"id":    1,
					"nome":  "Usuário Teste",
					"email": "teste@exemplo.com",
				},
				{
					"id":    2,
					"nome":  "Segundo Usuário",
					"email": "segundo@exemplo.com",
				},
			},
		})
	})
	return r
}

func TestPostCadastro(t *testing.T) {
	router := setupRouter()
	form := url.Values{}
	form.Add("nome", "Diego")
	form.Add("email", "diego@exemplo.com")
	form.Add("senha", "123456")
	req, _ := http.NewRequest("POST", "/cadastro", strings.NewReader(form.Encode()))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Errorf("Esperado status 200, obtido %d", w.Code)
	}
	if !strings.Contains(w.Body.String(), "Cadastro realizado com sucesso") {
		t.Errorf("Resposta não contém mensagem de sucesso")
	}
	if !strings.Contains(w.Body.String(), "Diego") {
		t.Errorf("Resposta não contém nome enviado")
	}
	if !strings.Contains(w.Body.String(), "diego@exemplo.com") {
		t.Errorf("Resposta não contém email enviado")
	}
}

func TestGetCadastro(t *testing.T) {
	router := setupRouter()
	req, _ := http.NewRequest("GET", "/cadastro", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	if w.Code != 200 {
		t.Errorf("Esperado status 200, obtido %d", w.Code)
	}
	if !strings.Contains(w.Body.String(), "Usuário Teste") {
		t.Errorf("Resposta não contém 'Usuário Teste'")
	}
	if !strings.Contains(w.Body.String(), "Segundo Usuário") {
		t.Errorf("Resposta não contém 'Segundo Usuário'")
	}
	if !strings.Contains(w.Body.String(), "teste@exemplo.com") {
		t.Errorf("Resposta não contém 'teste@exemplo.com'")
	}
	if !strings.Contains(w.Body.String(), "segundo@exemplo.com") {
		t.Errorf("Resposta não contém 'segundo@exemplo.com'")
	}
}