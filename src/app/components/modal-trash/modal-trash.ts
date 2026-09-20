import { Component, output, input } from '@angular/core';
import { DeletModal } from '../../core/services/modalTrash/delet-modal';

@Component({
  selector: 'app-modal-trash',
  imports: [],
  templateUrl: './modal-trash.html',
  styleUrl: './modal-trash.css',
})
export class ModalTrash {
  constructor(private deleteService: DeletModal) {}

  //visible: boolean = false;
  closeModal = output<void>();
  serviceId = input<string>();

  deleteServiceId() {
    console.log('Fechando serviço:', this.serviceId());

    const serviceId = this.serviceId();

    if (serviceId !== undefined) {
      this.deleteService.removeServiceId(serviceId).subscribe({
        next: (data) => {
          console.log('serviço deletado', data);
          this.handleCloseModal();
          window.location.reload();
        },

        error: (err) => {
          console.log('Erro ao deletar');
          console.error('Status:', err.status);
        },
      });
    }
  }

  handleCloseModal() {
    this.closeModal.emit();
  }

  // handleCloseModal() {
  //   this.visible = true;
  //   console.log('botao tivado', this.visible);
  //}
}
