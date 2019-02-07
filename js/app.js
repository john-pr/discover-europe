import $ from "jquery";

$(function() {
    const countries= $('path');
    // const countryName = $('.countryName');
    const countryDiv = $('.countryInfo');
    let cntryName = $('.countryName');
    let cntryCurrency = $('.countryCurrency');
    let cntryCapital = $('.countryCapital');
    let cntryTimezone = $('.countryTimezone');
    let cntryConversion = $('.countryConversion');
    let cntryVaccination = $('.countryVaccination');
    let cntryVaccinationInfo = $('.countryVaccinationInfo');
    // let cntryMoreInfoVacc = $('.vaccination');
    let cntrySocketsInfo = $('.countrySockets');
    let socketImage = $('.socketImg');
    let vacneed = $('.vacNeed');
    let vacfor = $('.vacFor');
    let cntryNumber = $('.countryNumber');
    let cntryPolice = $('.policeLogo');
    let cntryFire = $('.fireLogo');
    let cntryHospital = $('.medicLogo');
    let vacNoNeed = $('.vacNoNeed');
    let cancelBtn = $('.fa-times-circle');
    // let skyscanner = $('.scanner');
    // let skyscanner2 = $('.scanner2');


    cancelBtn.on('click', function(ev) {
        countries.removeClass('selected');
        countryDiv.css('opacity', 0)
    });

    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function(){
                window.location.hash = hash;
            });
        }
    });

    countryDiv.css('opacity', 0);

    countries.each((index, element) => {
        $(element).on('click', function(event) {
            countryDiv.css('opacity', 1);
            countries.removeClass('selected');
            event.target.classList.toggle('selected');

            let currCountry = event.target.getAttribute('name');
            console.log(currCountry);

            // skyscanner.attr('content', `${currCountry}`);
            // skyscanner.attr('data-destination-name', `${currCountry}`);
            // console.log(skyscanner.attr('content'));
            // skyscanner.data('params', `colour:glen;location:${currCountry};locationId:EDI` );

            const countriesUrl = `https://travelbriefing.org/${currCountry}?format=json`;
            $.ajax(countriesUrl)
                .done(function(data) {
                    const countriesInformation = JSON.parse(data);
                    // console.log(countriesInformation);
                    // console.log(countriesInformation.electricity.plugs);
                    cntryTimezone.text(countriesInformation.timezone.name);
                    cntryName.text(countriesInformation.names.name);
                    cntryConversion.text(`1$ ~ ${Math.round(countriesInformation.currency.rate * 100) / 100} ${countriesInformation.currency.name}`);
                    cntrySocketsInfo.text(`Frequency: ${countriesInformation.electricity.frequency} Voltage: ${countriesInformation.electricity.voltage}`);

                    if(countriesInformation.vaccinations[0] === undefined) {
                        // cntryMoreInfoVacc.html(`<h4>Vaccination not needed.</h4>`)
                        vacneed.hide();
                        vacfor.hide();
                        cntryVaccination.text('');
                        cntryVaccinationInfo.text('');
                        vacNoNeed.show();

                    } else {
                        vacNoNeed.hide();
                        vacneed.show();
                        vacfor.show();
                        cntryVaccination.text(countriesInformation.vaccinations[0].message);
                        cntryVaccinationInfo.text(countriesInformation.vaccinations[0].name);
                    }

                    let plugs = countriesInformation.electricity.plugs;
                    socketImage.html('');

                    for(let i = 0; i < plugs.length; i++) {
                        if(plugs[i] === 'C') {
                            socketImage.append(`<img src="./img/C_dia_sock_l.png" alt="socketImg"/>`)
                        } else if(plugs[i] === "F") {
                            socketImage.append(`<img src="./img/F_dia_sock_l.png" alt="socketImg"/>`)
                        } else if(plugs[i] === "E") {
                            socketImage.append(`<img src="./img/E_dia_sock_l.png" alt="socketImg"/>`)
                        } else if(plugs[i] === "G") {
                            socketImage.append(`<img src="./img/G_dia_sock_l.png" alt="socketImg"/>`)
                        } else if(plugs[i] === "L") {
                            socketImage.append(`<img src="./img/L_dia_sock_l.png" alt="socketImg"/>`)
                        }
                    }

                    cntryNumber.text(countriesInformation.telephone.calling_code);
                    cntryPolice.text(countriesInformation.telephone.police);
                    cntryFire.text(countriesInformation.telephone.fire);
                    cntryHospital.text(countriesInformation.telephone.ambulance);



                });
            const restCountries = `https://restcountries.eu/rest/v2/name/${currCountry}`;
            $.ajax(restCountries)
                .done(function (data1) {
                    // console.log(data1);
                    for(var i = 0; i < data1.length; i++) {
                        let cntryFlag = $('.countryFlag');
                        cntryFlag.attr('src', data1[i].flag);
                        cntryCapital.text(data1[i].capital);

                        // console.log(data1[i].timezones);

                        const data1Currency = data1[i].currencies;
                        // console.log(data1Currency)

                        for(var j = 0; j < data1Currency.length; j++) {
                            // console.log(data1Currency[j].name);
                            cntryCurrency.text(data1Currency[j].name);
                        }


                    }


                });



            // console.log(allDivs.length);


        })
    });

    // SLIDER

    const allDivs = $('.countryInfo_list');
    const prevBtn = $('.fa-chevron-left');
    const nextBtn = $('.fa-chevron-right');
    let counterDiv = 0;

    function nextDiv() {
        allDivs.eq(counterDiv).removeClass('visible');
        // console.log(counterDiv);
        if(counterDiv === allDivs.length - 1) {
            counterDiv = 0;
        } else {
            counterDiv++;
        }
        allDivs.eq(counterDiv).addClass('visible');
        // console.log(counterDiv);
    }

    function prevDiv() {
        allDivs.eq(counterDiv).removeClass('visible');

        if(counterDiv === 0) {
            counterDiv = allDivs.length - 1;
        } else {
            counterDiv--;
        }

        allDivs.eq(counterDiv).addClass('visible');
    }


    allDivs.eq(counterDiv).addClass('visible');
    nextBtn.on('click', nextDiv);
    prevBtn.on('click', prevDiv);



});

