interface RaiffeisenXMLStatement {
  TransakcioniRacunPrivredaIzvod: {
    Zaglavlje: {
      '@_VrstaIzvoda': string;
      '@_IzvodID': string;
      '@_BrojIzvoda': string;
      '@_DatumIzvoda': string;
      '@_MaticniBroj': string;
      '@_KomitentNaziv': string;
      '@_KomitentAdresa': string;
      '@_KomitentMesto': string;
      '@_KomitentDinarskoKnjigovodstvo': string;
      '@_Partija': string;
      '@_TipRacuna': string;
      '@_PrethodnoStanje': string;
      '@_DugovniPromet': string;
      '@_PotrazniPromet': string;
      '@_NovoStanje': string;
      '@_StanjeObracunateProvizije': string;
      '@_TekstPoruke': string;
      '@_DatumOdMinus': string;
      '@_DozvoljeniMinus': string;
      '@_DatumDoMinus': string;
      '@_NapomenaRezDebitKart': string;
    };
    Stavke: Array<{
      '@_NalogKorisnik': string;
      '@_Mesto': string;
      '@_VasBrojNaloga': string;
      '@_BrojRacunaPrimaocaPosiljaoca': string;
      '@_Opis': string;
      '@_SifraPlacanja': string;
      '@_SifraPlacanjaOpis': string;
      '@_Duguje': string;
      '@_Potrazuje': string;
      '@_ModelZaduzenjaOdobrenja': string;
      '@_PozivNaBrojZaduzenjaOdobrenja': string;
      '@_ModelKorisnika': string;
      '@_PozivNaBrojKorisnika': string;
      '@_BrojZaReklamaciju': string;
      '@_Referenca': string;
      '@_Objasnjenje': string;
      '@_DatumValute': string;
    }>;
  };
}

export type { RaiffeisenXMLStatement };
