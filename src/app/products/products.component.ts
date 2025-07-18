import { Component } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { CommonModule, NgFor } from '@angular/common';
import { Icategory } from '../models/icategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  getImagePath(product: Iproduct): string {
    return product.imgUrl;
  }
  products:Iproduct[]
  categories : Icategory[];
  selectedCategoryId: number = 0;

  totalOrderPrice: number = 0;
  buy(productId: number, count: string) {
  const quantityToBuy = +count;

  if (quantityToBuy <= 0) {
  alert('Quantity must be a positive number ');
  return;
}

// Find the product with the matching ID
const targetProduct = this.products.find(p => p.id === productId);

if (!targetProduct) {
  alert('Product not found ');
  return;
}

if (targetProduct.quantity < quantityToBuy) {
  alert(`Requested quantity exceeds available stock (${targetProduct.quantity}) `);
  return;
}

// Deduct the quantity
targetProduct.quantity -= quantityToBuy;

// Calculate the total price
this.totalOrderPrice += quantityToBuy * targetProduct.price;

}


  constructor(){

    this.products = [
      // لابتوب
      {
        id: 100,
        name: 'Dell XPS 13',
        price: 35000,
        quantity: 5,
        imgUrl: 'assets/Dell XPS 13.jpg',
        catId: 1
      },
      {
        id: 200,
        name: 'HP Spectre x360',
        price: 32000,
        quantity: 0,
        imgUrl: 'assets/HP Spectre x360.jpg',
        catId: 1
      },
      // فون
      {
        id: 300,
        name: 'iPhone 15',
        price: 42000,
        quantity: 8,
        imgUrl: 'assets/iPhone 15.jpg',
        catId: 2
      },
      {
        id: 400,
        name: 'Samsung Galaxy S24',
        price: 39000,
        quantity: 6,
        imgUrl: 'assets/Samsung Galaxy S24.jpg',
        catId: 2
      },
      // تابلت
      {
        id: 500,
        name: 'iPad Pro',
        price: 28000,
        quantity: 1,
        imgUrl: 'assets/iPad Pro.png',
        catId: 3
      },
      {
        id: 600,
        name: 'Samsung Galaxy Tab S9',
        price: 25000,
        quantity: 7,
        imgUrl: 'assets/Samsung Galaxy Tab S9.jpg',
        catId: 3
      }
    ];

    this.categories =[
      {
        id: 1,
        name: 'laptop'
      },
      {
        id: 2,
        name: 'phone'
      },
      {
        id: 3,
        name: 'tablet'
      }
    ]

  }
  activeProductId: number | null = null;

  selectProduct(productId: number) {
    this.activeProductId = productId;
  }

  isActive(productId: number): boolean {
    return this.activeProductId === productId;
  }
  change(){
    this.selectedCategoryId = 0;
  }
}

