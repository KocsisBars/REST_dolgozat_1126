import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Travel } from './travel';
import { CreateTravelDto } from './create-travel.dto';
import { UpdateTravelDto } from './update-travel.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  travels: Travel[] = [
    {
      destination: "Japan",
      description:
        "Go hiking on Mt. Fuji, visit the Tokyo Imperial Palace, or just relax at a traditional, family owned hot spring resort.",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
      price: 199_999,
      discount: 10,
      id: 1,
    },
    {
      destination: "Egypt",
      description: "Where the pharaohs and the oldest gods lived.",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/01_khafre_north.jpg",
      price: 155_000,
      discount: 0,
      id: 2,
    },
    {
      description: "Easter Island",
      destination: "There are a few giant head statues I guess...",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/Rano_Raraku_quarry.jpg",
      price: 250_000,
      discount: 50,
      id: 4,
    },
  ];
  nextID = 5;

  @Get('travels')
  travelsListazas(){
    return this.travels;
  }

  @Get('travels/:id')
  travelsIdAlapjan(@Param('id') id:string){
    const idSzam = parseInt(id);
    const travel = this.travels.find(travel => travel.id == idSzam);
    if (!id) {
      throw new NotFoundException("Nincs ilyen ID-jű utazás")
    }
    return travel;
  }

  @Post('travels')
  travel(@Body() ujTravelAdatok: CreateTravelDto){
    const ujTravel: Travel = {
      ...ujTravelAdatok,
      id: this.nextID,
    }
    this.nextID++;
    this.travels.push(ujTravel);
    return ujTravel;
  }

  @Patch('travels/:id')
  travelsModositas(@Param('id')id:string, @Body() travelAdatok: UpdateTravelDto){
    const idSzam = parseInt(id);
    const originalTravelID = this.travels.findIndex(travel => travel.id == idSzam);
    if (originalTravelID == -1) {
      throw new NotFoundException("Nincs ilyen ID-jű utazás")
    }
    const originalTravel = this.travels[originalTravelID];

    const ujTravel: Travel = {
      ...originalTravel,
      ...travelAdatok,
    };
    this.travels[originalTravelID] = ujTravel;
    return ujTravel;
  }

  @Delete('travels/:id')
  travelTorles(@Param('id')id:string){
    const idSzam = parseInt(id);
    const originalID = this.travels.findIndex(travel => travel.id == idSzam)
    if (originalID == -1) {
      throw new NotFoundException("Nincs ilyen ID-jű utazás")
    }
    this.travels.splice(originalID);
  }
}
