class ServiceClient {
  createClient(
    name: string,
    email: string,
    phone: string,
    documentType: string,
    documentNumber: string,
  ) {
    try {
      if (!name) {
        throw new Error("Nombre es requerido");
      }
      if (!email) {
        throw new Error("Email es requerido");
      }
      if (!phone) {
        throw new Error("Telefono es requerido");
      }
      if (!documentType) {
        throw new Error("Tipo de documento es requerido");
      }
      if (!documentNumber) {
        throw new Error("Numero de documento es requerido");
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  updateClient() {}

  deleteClient() {}

  getClient() {}

  getClients() {}
}
