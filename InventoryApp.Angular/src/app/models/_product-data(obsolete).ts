import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Product } from './product';
import { Book } from './book';

export class ProductData implements InMemoryDbService {

  createDb() {
    const products: Product[] = [
      {
        id: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2018',
        description: 'Leaf rake with 48-inch wooden handle',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/leaf_rake.png',
        tags: ['rake', 'leaf', 'yard', 'home']
      },
      {
        id: 2,
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2018',
        description: '15 gallon capacity rolling garden cart',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/garden_cart.png'
      },
      {
        id: 5,
        productName: 'Hammer',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2018',
        description: 'Curved claw steel hammer',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/hammer.png',
        tags: ['tools', 'hammer', 'construction']
      },
      {
        id: 8,
        productName: 'Saw',
        productCode: 'TBX-0022',
        releaseDate: 'May 15, 2018',
        description: '15-inch steel blade hand saw',
        price: 11.55,
        starRating: 3.7,
        imageUrl: 'assets/images/saw.png'
      },
      {
        id: 10,
        productName: 'Video Game Controller',
        productCode: 'GMG-0042',
        releaseDate: 'October 15, 2018',
        description: 'Standard two-button video game controller',
        price: 35.95,
        starRating: 4.6,
        imageUrl: 'assets/images/xbox-controller.png'
      }
    ];

    // const books: Book[] = [
    //   {
    //     id: 1,
    //     bookTitle: 'ASP.NET MVC Certification',
    //     ISBN: '5977504624',
    //     author: 'William Penberthy',
    //     topic: 'IT',
    //     publishedDate: 'March 19, 2010',
    //     description: 'Certification for ASP.NET MVC',
    //     price: 19.95,
    //     starRating: 4.5,
    //     bookImageUrl: 'assets/images/asp_net_mvc.png',
    //     tags: ['mvc', 'asp.net', 'microsoft']
    //   },
    //   {
    //     id: 2,
    //     bookTitle: 'Doctor Jivago',
    //     ISBN: '5977508746',
    //     author: 'Pasternak',
    //     topic: 'History',
    //     publishedDate: '10 January, 1990',
    //     description: 'History and revolution in Russia',
    //     price: 7.95,
    //     starRating: 5,
    //     bookImageUrl: 'assets/images/jivago.png',
    //     tags: ['doctor', 'jivago', 'russia']
    //   },
    //   {
    //     id: 1,
    //     bookTitle: 'Ecce Homo',
    //     ISBN: '59775041245',
    //     author: 'Friedrich Nietzsche',
    //     publishedDate: 'April 27, 1900',
    //     description: 'About psychology',
    //     topic: 'Psychology',
    //     price: 10.47,
    //     starRating: 4.5,
    //     bookImageUrl: 'assets/images/ecce_homo.png',
    //     tags: ['psychology']
    //   },
    //   {
    //     id: 1,
    //     bookTitle: 'Bali',
    //     ISBN: '5977508795',
    //     author: 'Unknown',
    //     topic: 'Travel',
    //     publishedDate: 'August 19, 2000',
    //     description: 'Description of the Bali island and culture',
    //     price: 19.95,
    //     starRating: 4.5,
    //     bookImageUrl: 'assets/images/bali.png',
    //     tags: ['bali']
    //   },
    //   {
    //     id: 1,
    //     bookTitle: 'Tonitza',
    //     ISBN: '59775047852',
    //     author: 'Colectia Adevarul',
    //     topic: 'Art',
    //     publishedDate: 'March 19, 2018',
    //     description: 'Life and work of painter Tonitza',
    //     price: 29.95,
    //     starRating: 4.5,
    //     bookImageUrl: 'assets/images/tonitza.png',
    //     tags: ['tonitza', 'art', 'painting']
    //   }
    // ];
    return { products };
  }
}
