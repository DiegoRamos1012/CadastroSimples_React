package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type CadastroResponse struct {
	// Campo Nome do tipo string que será serializado para JSON com a chave "nome"
	Nome    string `json:"nome"` // Define o campo - Indica que armazenará texto - Instrui o serializador a usar "nome" como nome da propriedade no JSON
	Email   string `json:"email"`
	Message string `json:"message"`
}

// Função principal que será executada quando o programa iniciar
func main() {
	// Cria uma nova instância do router Gin com a configuração padrão
	// Inclui middleware de logger e recuperação de pânico
	r := gin.Default()

	// Configura o middleware CORS para permitir solicitações cross-origin
	r.Use(cors.New(cors.Config{
		// Define quais origens podem acessar sua API
		// Aqui, apenas http://localhost:3000 (seu frontend) pode fazer requisições
		AllowOrigins: []string{"http://localhost:3000"}, // Tente http://localhost:8080 no Postman

		// Define quais métodos HTTP são permitidos
		// GET: para obter dados
		// POST: para enviar dados novos
		// PUT: para atualizar dados existentes
		// DELETE: para remover dados
		// OPTIONS: usado automaticamente pelo navegador para verificar se a requisição é permitida
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},

		// Define quais cabeçalhos HTTP podem ser enviados na requisição
		// Origin: indica de onde a requisição está vindo
		// Content-Type: indica o formato dos dados enviados
		// Accept: indica quais formatos o cliente aceita como resposta
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},

		// Define quais cabeçalhos podem ser lidos pelo cliente
		// Content-Length: tamanho da resposta em bytes
		ExposeHeaders: []string{"Content-Length"},

		// Permite envio de cookies e autenticação nas requisições cross-origin
		AllowCredentials: true,

		// Define por quanto tempo (12 horas) o navegador pode armazenar em cache
		// o resultado da requisição OPTIONS (pré-voo)
		MaxAge: 12 * time.Hour,
	}))

	// Define uma rota POST para o endpoint "/cadastro"
	r.POST("/cadastro", func(c *gin.Context) {
		// Extrai os valores do formulário enviado na requisição
		// c.PostForm busca dados enviados no formato application/x-www-form-urlencoded
		nome := c.PostForm("nome")
		email := c.PostForm("email")

		response := CadastroResponse{
			Nome:    nome,
			Email:   email,
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

	// Inicia o servidor HTTP na porta 8080
	// Esta linha bloqueia a execução até que o servidor seja encerrado
	r.Run(":8080")
}