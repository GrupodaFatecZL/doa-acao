export interface DonationData {
  idDonation?: string
  chaveUnicaDoador: string
  chaveUnicaBeneficiario: string
  idProduct: string 
  dataMaxRetirada: Date
  dataRetirada?: Date | null
}


export interface IDonations {
  createDonation: (data: DonationData) => Promise<void>;
  findDonations: () => Promise<DonationData[] | undefined>
  findOneDonation: (params: Object) => Promise<DonationData | null>
  updateDonation: (data: DonationData) => Promise<void>
  deleteDonation: (idDonation: string) => Promise<void>
}