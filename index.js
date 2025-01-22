import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, setDoc, doc, collection } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyAm7alZssivC27byHGhljLNnlNTvozANoU",
//     authDomain: "wodpacer-hosting.firebaseapp.com",
//     databaseURL: "https://wodpacer-hosting-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "wodpacer-hosting",
//     storageBucket: "wodpacer-hosting.appspot.com",
//     messagingSenderId: "543411213166",
//     appId: "1:543411213166:web:65f765a4407d73ebd1277f",
//     measurementId: "G-JXHVY4V0QN"
//   };

const firebaseConfig = {
    apiKey: "AIzaSyDnZ8ts0-ljk7G4R0jwB3Kdpuxh06pUKnY",
    authDomain: "wodsite-1ef0c.firebaseapp.com",
    projectId: "wodsite-1ef0c",
    storageBucket: "wodsite-1ef0c.firebasestorage.app",
    messagingSenderId: "2705551511",
    appId: "1:2705551511:web:25807afec6d5174876b9d2",
    measurementId: "G-2JDDP6K7X8"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const analytics = getAnalytics(app);

async function new_user(first_name, last_name, email, created_at) {

    const user_ref = doc(collection(db, "users"));

    await setDoc(user_ref, {
    first_name: first_name,
    last_name: last_name,
    email: email,
    created_at: created_at
  });
}


// Link functionality
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection)
});

function scrollToSection(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href'); // Get the target section ID

    // Scroll to the target section smoothly
    document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
    });

    console.log(targetId);

    logEvent(analytics, 'select_content', {
        content_type: 'click_menu',
        content_id: targetId
      });
    
}

// Navigate to signup
const button1 = document.querySelector('.btn_gotosignup');
button1.addEventListener('click', scrollToSignup);

function scrollToSignup() {
    document.querySelector('#join').scrollIntoView({ behavior: 'smooth' });
}

// Navigate to learn more
const button2 = document.querySelector('.btn_learnmore');
button2.addEventListener('click', scrollToSection1);

function scrollToSection1() {
    document.querySelector('#whoarewe').scrollIntoView({ behavior: 'smooth' });
}

function save(form, event) {
    
    if (!form.checkValidity()) {
        return "Validation failed";
    }

    const d = new Date();
    const date = d.toISOString();

    const name = form.inputFirstName.value;
    const last = form.inputLastName.value;
    const email = form.inputEmail.value;
    
    event.preventDefault();

    new_user(name, last, email, date);

    logEvent(analytics, 'select_content', {
        content_type: 'click_signup_form'
    });

    form.innerHTML = '<p class="thank-you">Thank you for signing up to our email list!</p>';
}

(function () {
    'use strict'


    const forms = document.querySelectorAll('.validation')
    
    Array.from(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }

            save(form, event);
            
            form.classList.add('was-validated')
        }, false)
    })
})()


document.getElementsByClassName("video-container")[0].addEventListener("click", () => {
    const frame = document.createElement('iframe');
    const container = document.getElementsByClassName("video-container")[0];

    frame.setAttribute('width', "560" );
    frame.setAttribute('height', "315" );
    frame.setAttribute('src', "https://www.youtube.com/embed/WAsqX-w1RoI?si=Z7-3c04F-Psj_ebw&autoplay=1");
    frame.setAttribute('title', "YouTube video player" );
    frame.setAttribute('frameborder', "0"); 
    frame.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");  
    frame.setAttribute('referrerpolicy', "strict-origin-when-cross-origin" );

    container.removeChild(container.children[0]);
    container.appendChild(frame);

});

document.getElementsByClassName("video-container")[1].addEventListener("click", () => {
    const video = document.createElement('video');
    const source = document.createElement('source');
    const container = document.getElementsByClassName("video-container")[1];
    
    source.setAttribute('src', "./img/WODPacer_videoreel_c.mp4" );
    source.setAttribute('type', 'video/mp4');

    video.setAttribute('controls', true);
    video.setAttribute('width', '280');
    video.setAttribute('height','500');
    video.setAttribute('autoplay', true);
    video.appendChild(source);
    
    container.removeChild(container.children[0]);    
    container.prepend(video);
});

/** inicio:
 *                      Pc     Mob
 *  desempenho          33     42
 *  acessibilidade      70     78
 *  praticas            70     71
 *  seo                 82     82
 */