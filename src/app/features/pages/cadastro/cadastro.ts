import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../../core/services/api';


interface Funcionario {
  name: string;
  email: string;
  password: string;
  city: string;
}
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
image = '';
 name = '';
 email = '';
 password = '';
 city = '';
 street = '';
 number = '';
 neighborhood = '';
phone = '';
//funcionario: Funcionario[] = [];
 constructor(private api: Api) {}

cadastrar(){

  const dadosCadastro = {
    name: this.name,
    email: this.email,
    password: this.password,
    city: this.city,
    street: this.street,
    number: this.number,
    neighborhood: this.neighborhood,
    phone: this.phone,
    image: this.image
  };

  console.log('Enviando dados para cadastro:', dadosCadastro);

  this.api.createPost(dadosCadastro).subscribe({
    next: (res) => {
      console.log('Cadastro realizado com sucesso!', res);
      // Aqui você pode adicionar lógica para lidar com o sucesso,
      // como limpar o formulário, redirecionar o usuário ou mostrar uma mensagem.
    },
    error: (err) => {
      console.error('Erro ao cadastrar:', err);
      // Aqui você pode adicionar lógica para lidar com o erro,
      // como mostrar uma mensagem de erro para o usuário.
    }
  });

}
//console.log('Nome do barbeiro',this.nome);



}
