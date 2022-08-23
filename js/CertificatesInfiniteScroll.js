//Comparer Function    
function SortByDate(a, b) { 
    return new Date(b.create_date).getTime() - new Date(a.create_date).getTime();
} 

var certificates = JSON.parse(localStorage.getItem('certificates'));    
certificates.sort(SortByDate);

        
var listElm = document.querySelector('#coupons');
var idx = 0;

            
            var loadMore = function() {
              for (var i = 0; i < 5; i++, idx++) {
                  
                if(idx>=certificates.length) idx=0;
                  
                var coupon = document.createElement('div');
                coupon.classList.add('coupon');
                
                var square = document.createElement('div');
                square.classList.add('square');
                  
                var coupon_image = document.createElement('img');
                coupon_image.classList.add('coupon-image');
                coupon_image.src = certificates[idx].image_src;
                square.appendChild(coupon_image);
                  
                var coupon_info = document.createElement('div');
                coupon_info.classList.add('coupon-info');
                  
                  
                  
                var first_line = document.createElement('div');
                first_line.classList.add('first-line'); 
                  
                var coupon_name = document.createElement('div');
                coupon_name.classList.add('coupon-name');
                coupon_name.textContent = certificates[idx].name;
                first_line.appendChild(coupon_name);
                  
                var favourite = document.createElement('div');
                favourite.classList.add('favourite');
                  
                var image = document.createElement('img');
                image.src = "images/favourite.svg";                
                  
                favourite.appendChild(image);
                first_line.appendChild(favourite);
                  
                  
                  
                var second_line = document.createElement('div');
                second_line.classList.add('second-line'); 
                                    
                var description = document.createElement('div');
                description.classList.add('description');
                description.textContent = certificates[idx].description;
                second_line.appendChild(description);
                  
                var expires = document.createElement('div');
                expires.classList.add('expires');
                expires.textContent = 'Expires in ';
                expires.textContent += certificates[idx].duration;
                expires.textContent += ' days';
                second_line.appendChild(expires);
                  
                  
                  
                var third_line = document.createElement('div');
                third_line.classList.add('third-line');                  
                  
                var price = document.createElement('div');
                price.classList.add('price');
                price.textContent = certificates[idx].price;
                third_line.appendChild(price); 
                  
                var add_button = document.createElement('div');
                add_button.classList.add('add-button');
                  
                var input = document.createElement("input");
                input.setAttribute('type', 'submit');
                input.setAttribute('value', 'Add to Cart');
                
                
                add_button.appendChild(input);
                third_line.appendChild(add_button);
                  
                  
                  
                var line = document.createElement('hr');
                  
                  
                  
                coupon_info.appendChild(first_line);
                coupon_info.appendChild(second_line);
                coupon_info.appendChild(line);
                coupon_info.appendChild(third_line);
                  
                coupon.appendChild(square);
                coupon.appendChild(coupon_info);
                listElm.appendChild(coupon);
              }
            }

            
            window.addEventListener('scroll', function() {
              if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                loadMore();
              }
            });

            
            loadMore();