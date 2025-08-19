import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociationsService {
  /**
   * Get associations data
   * @returns Random association data
   */
  async getAssociations() {
    const associations = [
        
            { "id": "1", "name": "CII", "logoUrl": "cii.png" },
            { "id": "2", "name": "IIM", "logoUrl": "iim.png" },
            { "id": "3", "name": "IIMA", "logoUrl": "iima.png" },
            { "id": "4", "name": "IIT Delhi", "logoUrl": "iitDelhi.png" },
            { "id": "5", "name": "SPJIMR", "logoUrl": "spjimr.png" },
            { "id": "6", "name": "TERI", "logoUrl": "teri.png" },
            { "id": "7", "name": "USAID", "logoUrl": "usaid.png" },
            { "id": "8", "name": "World Bank", "logoUrl": "worldBank.png" },
            { "id": "9", "name": "IIMB", "logoUrl": "iimb.png" }
          
          
    ];

    return {
      associations,
      totalCount: associations.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
