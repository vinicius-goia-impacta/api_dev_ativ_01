import { Body, Controller, Get, Delete, Post, Query } from '@nestjs/common';
import {
  UserClientApplicationRequest,
  UserClientApplicationResponse,
} from './userclient.application.model';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Controller('userclient')
export class UserClientApplicationController {

  private usuarios: Usuario[] = [];
  private proximoId = 1; 

  @Get('consulta')
  getConsulta() {
    return{
    mensagem: "Lista de usuários:", // a quebra de linha estará na string
    usuarios: this.usuarios
    }
  }

  @Post('cadastro')
  postCadastro(
    @Body() clientuserApplicationRequest : UserClientApplicationRequest,
    clientuserApplicationResponse : UserClientApplicationResponse) {
      const { nome, email } = clientuserApplicationRequest;
      
      if (!nome || !email)  {
        return { status: "Nome ou email não fornecidos" };
      }

      const email_cons = this.usuarios.find(c => c.email.toLowerCase() === email.toLowerCase());

      if (email_cons)  {
        return { status: "Email já cadastrado" };
      }

      const novoUsuario = { id: this.proximoId++, nome: nome, email: email};
      this.usuarios.push(novoUsuario);

      return {
      status: 'Usuário cadastrado',
      id: novoUsuario.id,
      nome,
      email,
    };
  }

  @Get('consultausuario')
  getConsultausuario(
    @Query('nome') nome: string){

    if (!nome) {
        return { status: "Nome não fornecido" };
    }

    const resultados = this.usuarios.filter(c => c.nome.toLowerCase() === nome.toLowerCase());

    if (resultados.length > 0) {
        return {status: "Usuários encontrados", resultados};
    } else {
        return { status: "Usuário não encontrado" };
    }
};
  
@Delete('exclusao')
  deleteUsuario(
    @Body() clientuserApplicationRequest : UserClientApplicationRequest,
    clientuserApplicationResponse : UserClientApplicationResponse){

      const email = clientuserApplicationRequest.email;

      if (!email)  {
        return { status: "Email não fornecido" };
    }

    const index = this.usuarios.findIndex(cliente => cliente.email.toLowerCase() === email.toLowerCase());

    if (index !== -1)  {
        this.usuarios.splice(index, 1);
        return  {
                status: "Usuário excluido com sucesso",
                email: email,
        };
    } else {
        return { status: "Usuário não encontrado" };

    }

};

}

 

