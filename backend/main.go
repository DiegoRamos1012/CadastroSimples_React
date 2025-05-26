package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type CadastroResponse struct {
	Nome    string `json:"nome"`
	Email   string `json:"email"`
	Senha   string `json:"senha"`
	Message string `json:"message"`
}

func main() {
	r := gin.Default()

	// Coloque o middleware de CORS primeiro
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
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

	r.Run(":8080")
}
