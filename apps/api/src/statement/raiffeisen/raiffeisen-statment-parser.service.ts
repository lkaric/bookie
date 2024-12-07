import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { parse, formatISO } from 'date-fns';

import { StatementParserService } from '../statement-parser.service';

import type { RaiffeisenXMLStatement } from './interfaces';
import type { ParsedStatementInterface } from '../interfaces';

@Injectable()
class RaiffeisenStatmentParserService implements StatementParserService {
  private readonly xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
  });

  parse(payload: string | Buffer): ParsedStatementInterface {
    const data: RaiffeisenXMLStatement = this.xmlParser.parse(payload);

    return {
      statement: {
        accountNumber:
          data.TransakcioniRacunPrivredaIzvod.Zaglavlje['@_Partija'],
        internalId: data.TransakcioniRacunPrivredaIzvod.Zaglavlje['@_IzvodID'],
        internalNumber:
          data.TransakcioniRacunPrivredaIzvod.Zaglavlje['@_BrojIzvoda'],
        issueDate:
          formatISO(
            parse(
              data.TransakcioniRacunPrivredaIzvod.Zaglavlje['@_DatumIzvoda'],
              'dd.MM.yyyy',
              new Date()
            )
          ).slice(0, 10) + 'T00:00:00.000Z',
        openingBalance:
          data.TransakcioniRacunPrivredaIzvod.Zaglavlje['@_PrethodnoStanje'],
        closingBalance:
          data.TransakcioniRacunPrivredaIzvod.Zaglavlje['@_NovoStanje'],
      },
      transactions: data.TransakcioniRacunPrivredaIzvod.Stavke.map((item) => ({
        reference: item['@_Referenca'],
        internalId: item['@_VasBrojNaloga'],
        client: item['@_NalogKorisnik'],
        clientAccountNumber: item['@_BrojRacunaPrimaocaPosiljaoca'],
        clientModelNumber: item['@_ModelKorisnika'],
        clientCallNumber: item['@_PozivNaBrojKorisnika'],
        place: item['@_Mesto'],
        amount:
          item['@_Duguje'] !== '0'
            ? `-${item['@_Duguje']}`
            : item['@_Potrazuje'],
        paymentCode: item['@_SifraPlacanja'],
        paymentCodeDescription: item['@_SifraPlacanjaOpis'],
        date:
          formatISO(
            parse(item['@_DatumValute'], 'dd.MM.yyyy', new Date())
          ).slice(0, 10) + 'T00:00:00.000Z',
      })),
    };
  }
}

export { RaiffeisenStatmentParserService };
