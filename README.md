<h1 align="center">
  <p align="center">todoapp</p>
</h1>
<p align="center">
  <a href="https://github.com/ivanchCinq/react-todo/actions"><img src="https://github.com/ivanchCinq/react-todo/workflows/CI/badge.svg"/></a>
</p>

## build
1. Setup a mongodb server
2. Rename `backend/.env.example` to `backend/.env` and edit the variables
3. `docker build -t todoapp .`

## run
1. `docker run -d -p 8080:3333 todoapp`