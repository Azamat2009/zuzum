let baseURL = "http://localhost:3000/goods"
let id = location.search
let selectedProducts = [];
fetch(baseURL + id)
    .then(res => res.json())
    .then(user => {
        user = user[0]

        let scren = document.querySelectorAll(".scren")
        scren.src = user.media[0]
        let slider = document.querySelectorAll(".hi")
        slider[0].src = user.media[0]
        slider[1].src = user.media[1]
        slider[2].src = user.media[2]
        slider[3].src = user.media[3]

        let app = document.querySelector(".tovar-right")
        let tovarBottomDiv = document.querySelector(".tovar-bottom")

        let tovarFlex = document.createElement("div");
        tovarFlex.classList.add("tovar-flex");


        let tovTitle = document.createElement("h2");
        tovTitle.textContent = user.title;

        let prices = document.createElement("div");
        prices.classList.add("prices");


        let tovOldPrice = document.createElement("span");
        tovOldPrice.id = "tov-old-price";
        tovOldPrice.innerHTML = user.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"

         let newPageTitle = "Купить - " + user.title;
        document.title = newPageTitle;
        
        let tovNewPrice = document.createElement("span");
        tovNewPrice.id = "tov-new-price";
        tovNewPrice.textContent =  ""           

        fetch(`${baseURL}/${user.id}`)
        .then(res => res.json())
        .then(data => {
            const newPrice = user.price * (100 - data.salePercentage) / 100;
            tovNewPrice.textContent = newPrice.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"
        })
        .catch(err => console.error(err));;

        prices.appendChild(tovNewPrice);
        prices.appendChild(tovOldPrice);

        let plus = document.createElement("div");
        plus.classList.add("plus");

        let hr = document.createElement("hr");

        let description = document.createElement("p");
        description.innerHTML = "Станьте востребованным разработчиком. Вы изучите основы программирования и основные концепции компьютерных наук, цифровые технологии, операционные системы, программное обеспечение, базы данных, системы аналитики, языки программирования и многое другое. Познакомитесь с тестированием и системным анализом. На программе сможете сделать осознанный выбор специализации и технологий, прокачаться в выбранном направлении.";

        let btns = document.createElement("div");
        btns.classList.add("btns");

        let addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-cart");
        addToCartBtn.textContent = "Добавить в корзину";


        addToCartBtn.addEventListener('click', () => {
          const isProductSelected = selectedProducts.some(product => product.id === user.id);
          if (!isProductSelected) {
            selectedProducts.push(user);
            localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
          }
        });

        const savedProducts = localStorage.getItem('selectedProducts');
        if (savedProducts) {
          selectedProducts = JSON.parse(savedProducts);
        }

        let addToFavBtn = document.createElement("button");
        addToFavBtn.classList.add("add-fav");
  
        addToFavBtn.textContent = "Добавить в избранное";

        // плюс и минус
let right = document.createElement("div");
let plusBtn = document.createElement("button");
let minusBtn = document.createElement("button");
let countSpan = document.createElement("span");

right.classList.add("right");

plusBtn.style.marginTop = "8px"
plusBtn.style.fontSize = "24px"
plusBtn.innerHTML = "+";
minusBtn.innerHTML = "-";
countSpan.innerHTML = "1";


let count = 1;
plusBtn.addEventListener("click", () => {
  count++;
  countSpan.textContent = count;
  updatePrice();
});

minusBtn.addEventListener("click", () => {
  if (count > 0) {
      count--;
      countSpan.textContent = count;
      updatePrice();
  }
});

function updatePrice() {
  fetch(`${baseURL}/${user.id}`)
      .then(res => res.json())
      .then(data => {
          const newPrice = user.price * (100 - data.salePercentage) / 100;
          const totalPrice = newPrice * count;
          tovNewPrice.textContent = totalPrice.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум";
      })
      .catch(err => console.error(err));
}

right.append(minusBtn);
right.append(countSpan);
right.append(plusBtn);

        addToFavBtn.addEventListener('click', () => {
          if (!user.favourite) {
            user.favourite = true;

  
            fetch(`${baseURL}/${user.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ favourite: true })
            })
              .then(res => {
                if (!res.ok) {
                  throw new Error('Failed to update favourite');
                }
              })
              .catch(err => console.error(err));
          }
        });

        btns.appendChild(addToCartBtn);
        btns.appendChild(addToFavBtn);

        //bottom

        let tovarBottom = document.createElement("div");

        let tovBottomTitle = document.createElement("h2");
        tovBottomTitle.textContent = "Описание товара";

        let tovBottomDescription = document.createElement("p");
        tovBottomDescription.innerHTML = user.description;

        tovarBottom.appendChild(tovBottomTitle);
        tovarBottom.appendChild(tovBottomDescription);


        app.appendChild(document.createElement("br"));
        app.appendChild(tovTitle);
        app.appendChild(document.createElement("br"));
        app.appendChild(document.createElement("br"));
        app.appendChild(prices);
        app.append(right)
        app.appendChild(document.createElement("br"));
        app.appendChild(hr);
        app.appendChild(document.createElement("br"));
        app.appendChild(description);
        app.appendChild(document.createElement("br"));
        app.appendChild(btns);


        app.appendChild(tovarFlex);
        tovarBottomDiv.appendChild(tovarBottom);

        let cards = document.querySelector('.cards')
        let type = user.type;


        fetch(baseURL)
          .then(res => res.json())
          .then(goods => {
            const similarGoods = goods.filter(good => good.type === type).slice(0, 5);
    
            similarGoods.forEach(good => {
              const cardDiv = document.createElement("div");
              const img1 = document.createElement("img");
              let productPage = document.createElement("a");
              const heart = document.createElement("img");
              const heartActive = document.createElement("img");
              const h3 = document.createElement("h3");
              const beforeSale = document.createElement("span");
              const bottomCardDiv = document.createElement("div");
              const span2 = document.createElement("span");
              const img4 = document.createElement("img");
              cardDiv.classList.add("card");
              img1.classList.add("productImage");
              beforeSale.classList.add("before-sale");
              heart.classList.add("heart");
              heartActive.classList.add("heart2");
              bottomCardDiv.classList.add("bottom-card");
              img4.classList.add("card-img")
        
              productPage.href = `/pages/tovar.html?id=${good.id}`;
              heart.src = "/public/icons/heart.svg";
              heart.alt = "";
              heartActive.src = "/public/icons/heart 1.png";
              heartActive.alt = "";
              h3.innerHTML = good.title;
              span2.textContent = good.price;
              beforeSale.textContent = good.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"
              img1.src = good.media[0];
              img4.id = "cardImg";
              img4.src = "/public/icons/card.svg";
              img4.alt = "";
        
              bottomCardDiv.appendChild(span2);
              bottomCardDiv.appendChild(img4);
              productPage.append(img1);
              cardDiv.appendChild(productPage);
              cardDiv.appendChild(heart);
              cardDiv.appendChild(heartActive);
              cardDiv.appendChild(h3);
              cardDiv.appendChild(beforeSale);
              cardDiv.appendChild(bottomCardDiv);
        
              if (good.favourite) {
                heart.classList.add('heart-none');
                heartActive.classList.add('heart2-active');
              } else {
                heart.classList.remove('heart-none');
                heartActive.classList.remove('heart2-active');
              }
        
              heart.addEventListener('click', () => {
                if (!good.favourite) {
                  heart.classList.add('heart-none');
                  heartActive.classList.add('heart2-active');
                  good.favourite = true;
        
                  fetch(`${baseURL}/${good.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ favourite: true })
                  })
                    .then(res => {
                      if (!res.ok) {
                        throw new Error('Failed to update favourite');
                      }
                      heart.classList.add('heart-none');
                      heartActive.classList.add('heart2-active');
                    })
                    .catch(err => console.error(err));
                }
              });
        
              heartActive.addEventListener('click', () => {
                if (good.favourite) {
                  heart.classList.remove('heart-none');
                  heartActive.classList.remove('heart2-active');
                  good.favourite = false;
        
                  fetch(`${baseURL}/${good.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ favourite: false })
                  })
                    .then(res => {
                      if (!res.ok) {
                        throw new Error('Failed to update favourite');
                      }
        
                      heart.classList.remove('heart-none');
                      heartActive.classList.remove('heart2-active');
                      })
                      .catch(err => console.error(err));
                      }
                      });
                      
                      img4.addEventListener('click', () => {
                        const isProductSelected = selectedProducts.some(product => product.id === good.id);
                        if (!isProductSelected) {
                          selectedProducts.push(good);
                          localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
                        }
                      });
              
                      const savedProducts = localStorage.getItem('selectedProducts');
                      if (savedProducts) {
                        selectedProducts = JSON.parse(savedProducts);
                      }
        
        
              fetch(`${baseURL}/${good.id}`)
                .then(res => res.json())
                .then(data => {
                  const newPrice = good.price * (100 - data.salePercentage) / 100;
                  span2.textContent = newPrice.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + " сум"
                })
                .catch(err => console.error(err));
        
              cards.append(cardDiv);
            });
          })
          .catch(err => console.error(err));
})






//slide to top
const backToTopBtn = document.querySelector('#back-to-top-btn');


window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }

  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    backToTopBtn.style.bottom = '80px';
  } else {
    backToTopBtn.style.bottom = '20px';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});