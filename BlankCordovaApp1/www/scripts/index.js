// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        window.addEventListener("batterystatus", onBatteryStatus, false);

        $('#btn').on('click', function (e) {
            $('#collaboList').html("");
            $('#collaboList').toggle();

            $.get("http://bip10:10000/Service1.svc/Collaborateurs/").then(function (data) {
                var tab = data["GetListCollResult"];
                tab = _.sortBy(tab, 'NomCollaborateur')
                    ;
                tab.forEach(function (col) {
                    $('#collaboList').append('<a class="list-group-item">' + col.NomCollaborateur + " " + col.PrenomCollaborateur + '</a>');
                });
                console.log(tab[0].NomCollaborateur);
            })

            console.log("salut");
        });
    };

    function onBatteryStatus(status) {
        if (status.level < 50) {
            console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
        }
    };

    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
    };
} )();