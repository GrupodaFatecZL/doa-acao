"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDonations = void 0;
const prisma_1 = require("../../prisma");
class PrismaDonations {
    async createDonation({ chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada }) {
        await prisma_1.prisma.donation.create({
            data: {
                chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada
            },
        });
    }
    async findDonations() {
        const result = await prisma_1.prisma.donation.findMany();
        return result;
    }
    async findDonationByUser(idUser) {
        const Donation = await prisma_1.prisma.donation.findMany({
            where: {
                chaveUnicaDoador: {
                    equals: idUser
                }
            }
        });
        return Donation;
    }
    async updateDonation(Donation) {
        await prisma_1.prisma.donation.update({
            where: {
                idDonation: Donation.idDonation,
            },
            data: {
                ...Donation
            },
        });
    }
    async deleteDonation(idDonation) {
        await prisma_1.prisma.donation.delete({
            where: {
                idDonation: idDonation,
            },
        });
    }
}
exports.PrismaDonations = PrismaDonations;
