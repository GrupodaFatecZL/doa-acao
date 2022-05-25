import { IDonations, DonationData } from "../repositories/IDonations";

export class SubmitDonationUseCase {
  constructor(
    private donationUseCase: IDonations
  ) {}

  async createDonation(request: DonationData) {
    const { idDonation, chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada } = request;

    await this.donationUseCase.createDonation({ idDonation, chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada });
  }

  async findManyDonations() {
    return await this.donationUseCase.findDonations();
  }

  async findOneDonation(params: Object) {
    return await this.donationUseCase.findOneDonation(params);
  }

  async updateDonation(request: DonationData) {
    await this.donationUseCase.updateDonation({ ...request})
  }

  async deleteDonation(email: string) {
    await this.donationUseCase.deleteDonation(email)
  }
}