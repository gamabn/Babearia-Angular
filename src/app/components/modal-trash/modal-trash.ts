import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-modal-trash',
  imports: [],
  templateUrl: './modal-trash.html',
  styleUrl: './modal-trash.css',
})
export class ModalTrash {
  //visible: boolean = false;
  closeModal = output<void>();
  serviceId = input<string>();

  handleCloseModal() {
    console.log('Fechando serviço:', this.serviceId());
    this.closeModal.emit();
  }

  // handleCloseModal() {
  //   this.visible = true;
  //   console.log('botao tivado', this.visible);
  //}
}
