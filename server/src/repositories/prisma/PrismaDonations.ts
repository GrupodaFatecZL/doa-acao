import { prisma } from "../../prisma";
import {
  DonationData,
  IDonations,
} from "../IDonations";


export class PrismaDonations implements IDonations {
  async createDonation({ chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada  }: DonationData) {
    await prisma.donation.create({
      data: {
        chaveUnicaDoador, chaveUnicaBeneficiario, idProduct, dataMaxRetirada, dataRetirada 
      },
    });
  }


  async findDonations(): Promise<DonationData[]  | undefined> {
    const result = await prisma.donation.findMany()
    return result 
  }


  async findOneDonation(params: Object): Promise<DonationData | null> {
    const Donation = await prisma.donation.findUnique({
      where: 
        params
    })

    return Donation
  }


  async updateDonation(Donation: DonationData): Promise<void> {
    await prisma.donation.update({
      where: {
        idDonation: Donation.idDonation,
      },
      data: {
        ...Donation
      },
    })
  }


  async deleteDonation(idDonation: string): Promise<void> {
    await prisma.donation.delete({
      where: {
        idDonation: idDonation,
      },
    })
  }
}
