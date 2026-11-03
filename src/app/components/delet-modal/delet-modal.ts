import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delet-modal',
  imports: [],
  templateUrl: './delet-modal.html',
  styleUrl: './delet-modal.css',
})
export class DeletModal {
  // O @Input permite que o componente pai envie o ID para cá
  @Input() idDelete: string | number | null = null;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirmarExclusao() {
    // Lógica para confirmar a exclusão do agendamento
    console.log('Agendamento excluído');
    this.onConfirm.emit();
  }
  cancelarExclusao() {
    // Lógica para cancelar a exclusão do agendamento
    console.log('Exclusão cancelada');
    this.onCancel.emit();
  }
}
