document.getElementById("startTypingButton").addEventListener("click", preloadPDF);

function preloadPDF() {
  const pdfUrl = "doc.pdf"; // Replace with the actual path to your PDF file

  const loadingTask = pdfjsLib.getDocument(pdfUrl);

  loadingTask.promise.then(function (pdf) {
    let textContent = "";

    const promises = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      promises.push(
        pdf.getPage(i).then(function (page) {
          return page.getTextContent().then(function (text) {
            text.items.forEach((item) => {
              textContent += item.str + " ";
            });
          });
        })
      );
    }

    Promise.all(promises).then(function () {
      displayAsParagraphs(textContent.trim());
    });
  }).catch(function (error) {
    console.error("Error loading PDF: ", error);
    alert("Failed to load PDF. Please ensure the file is accessible.");
  });
}

function displayAsParagraphs(text) {
  const output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous content

  const paragraphs = text.split("\n").filter((line) => line.trim() !== "");
  let index = 0;

  function typeParagraph() {
    if (index < paragraphs.length) {
      const paragraph = document.createElement("p");
      paragraph.textContent = ""; // Initialize empty

      output.appendChild(paragraph);
      autoType(paragraph, paragraphs[index], () => {
        index++;
        typeParagraph(); // Continue with the next paragraph
      });
    }
  }

  typeParagraph();
}

function autoType(element, text, callback) {
  let i = 0;

  function typeCharacter() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(typeCharacter, 30); // Adjust typing speed here
    } else {
      if (callback) callback();
    }
  }

  typeCharacter();
}

    // Doodle Animation Background
    const canvas = document.getElementById("doodleCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let doodles = [];

    class Doodle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 30 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initDoodles(count) {
      for (let i = 0; i < count; i++) {
        doodles.push(new Doodle());
      }
    }

    function animateDoodles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      doodles.forEach((doodle) => {
        doodle.update();
        doodle.draw();
      });
      requestAnimationFrame(animateDoodles);
    }

    initDoodles(30);
    animateDoodles();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      doodles = [];
      initDoodles(30);
    });