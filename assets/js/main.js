function showMenu(button)
{
  let containerMenu = document.querySelector('.uchet-menu');
  let menu = document.querySelector('.uchet-menu > menu');

  if(containerMenu.getAttribute('status') == 'close')
  {
    button.classList.add('fa-xmark');
    containerMenu.setAttribute('status', 'open');
    menu.style.left = '-10px';
  } else {
    button.classList.remove('fa-xmark');
    containerMenu.setAttribute('status', 'close')
    menu.style.left = '100vw';
  }
}

function showModal()
{
  const modalContainer = document.querySelector('.uchet-modal-container');

  if(modalContainer)
  {
    if(modalContainer.style.display == 'none')
    {
      modalContainer.style.display = 'flex';
      return;
    }

    const modalContent = modalContainer.querySelector('.uchet-modal');
    modalContent.classList.add('hiddenElement'); 

    setTimeout(() => {
      modalContainer.style.display = 'none';
      modalContent.classList.remove('hiddenElement');
    }, 280);
  }
}


function slider(interval)
{
  let sliderIndex = 0;
  const sliderContent = document.querySelector('.uchet-slider-content');
  const sliderItems = document.querySelectorAll('.uchet-slider-item');
  const sliderDotsContainer = document.querySelector('.uchet-slider-dots');
  const nextSlide = document.querySelector('.uchet-slider-arrow-right');
  const backSlide = document.querySelector('.uchet-slider-arrow-left');


  sliderItems.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('uchet-slider-dot');
    if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
      sliderIndex = i;
          updateSlider();
      });
      sliderDotsContainer.appendChild(dot);
  });
    
  const sliderDots = document.querySelectorAll('.uchet-slider-dot');

  function updateSlider() {
    sliderContent.style.transform = `translateX(-${sliderIndex * 100}vw)`;
    sliderDots.forEach(dot => dot.classList.remove('active'));
    sliderDots[sliderIndex].classList.add('active');
  }

  if(backSlide)
  {
    backSlide.addEventListener('click', () => {
      sliderIndex--;
      if (sliderIndex < 0) sliderIndex = sliderItems.length - 1;
      updateSlider();
    });
  }

  if(nextSlide)
  {
    nextSlide.addEventListener('click', () => {
      sliderIndex++;
      if (sliderIndex >= sliderItems.length) sliderIndex = 0;
      updateSlider();
    });

    setInterval(() => {
      nextSlide.click();
    }, interval);
  }
}

slider(5000);



function startCountdown(endDate, elementIds)
{
  const timer = setInterval(function()
  {
    const now = new Date().getTime();
    const distance = endDate - now;

    if(distance < 0)
    {
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateElement(elementIds.days, days);
    updateElement(elementIds.hours, hours);
    updateElement(elementIds.minutes, minutes);
    updateElement(elementIds.seconds, seconds);
  }, 1000);
}

function updateElement(id, newValue)
{
  const element = document.getElementById(id);
  if (element && element.textContent !== String(newValue))
  {
    element.textContent = newValue;
    element.classList.add('uchet-animated');

    setTimeout(function() {
      element.classList.remove('uchet-animated');
    }, 300);
  }
}

startCountdown(new Date('2023/08/01').getTime(), 
{
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
});