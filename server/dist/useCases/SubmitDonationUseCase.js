"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitDonationUseCase = void 0;
class SubmitDonationUseCase {
    constructor(donationUseCase) {
        this.donationUseCase = donationUseCase;
    }
    async createDonation(request) {
        const { idDonation, chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada } = request;
        await this.donationUseCase.createDonation({ idDonation, chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada });
    }
    async findManyDonations() {
        return await this.donationUseCase.findDonations();
    }
    async findDonationByUser(idUser) {
        return await this.donationUseCase.findDonationByUser(idUser);
    }
    async updateDonation(request) {
        await this.donationUseCase.updateDonation({ ...request });
    }
    async deleteDonation(email) {
        await this.donationUseCase.deleteDonation(email);
    }
}
exports.SubmitDonationUseCase = SubmitDonationUseCase;
