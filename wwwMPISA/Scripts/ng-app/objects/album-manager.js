var AlbumManager = function () {
    this.albums = [];

    this.initAlbums();
};

AlbumManager.prototype = {
    initAlbums: function () {

        var demo2015 = ({
            title: 'Demo 2015',
            cover: './Content/Images/Albums/1.jpg',
            songs: [
                {
                    id: 'one',
                    title: 'Martynas Pabėgimas',
                    artist: 'Demo 2015',
                    duration: '02:08',
                    url:
                        'http://vocaroo.com/media_command.php?media=s05dAiBamYzY&command=download_mp3',
                    lyrics:
                        'Bėgu pirmyn, progreso šalin, \r\nNerandu kur pasidėti - geriau aš pasislėpsiu:\r\n\r\nSulysiu į bara, išgersiu ten bokalą,\r\nO kitą rytą hedonizmui skelbsiu karą!\r\n\r\nBėgu nuo problemų, progreso šalin,\r\nBėgu nuo problemų, bėgu jų artyn.\r\n\r\nŽinau tokį vaikiną Martyną Pabėgimą:\r\nJis imasi darbų su didžiu malonumu.\r\n\r\nDeja, išgeręs dar bokalą jis viską meta\r\nIr atideda progresą į galą.\r\n\r\nBėgu nuo problemų, progreso šalin,\r\nBėgu nuo problemų, bėgu jų artyn.\r\n\r\nMAR TY NAS\r\n(PA) BĖ GI MAS.\r\nNelemtas jo LI KI MAS\r\nKankina kankina kankina mane.\r\n(ir tave)\r\n\r\nBėgu nuo problemų, progreso šalin,\r\nBėgu nuo problemų, bėgu jų artyn.'
                },
                {
                    id: 'two',
                    title: 'Nenoriu',
                    artist: 'Demo 2015',
                    duration: '01:01',
                    url:
                        'http://vocaroo.com/media_command.php?media=s0TM9vN9pmPK&command=download_mp3',
                    lyrics:
                        'Nenoriu nieko girdėti,\r\nNenoriu su tavim kalbėt,\r\nNenoriu matyti žmonių,\r\nNoriu, kad dingtum man iš akių.\r\n\r\nNenoriu kalbėti,\r\nNenoriu matyti,\r\nNoriu, kad tu nustotum šnekėti,\r\n\r\n\r\nNenoriu girdėti,\r\nNenoriu klausyti,\r\nToliau nuo visų noriu pabėgti.\r\n\r\nTu klausi manęs ar nebūna man liūdna,\r\nAš sakau, kad tu šneki šūdą,\r\nPabūt su savim turėtų kiekvienas,\r\nNes mirsim visi būdami vieni.\r\n\r\nNenoriu kalbėti,\r\nNenoriu matyti,\r\nNoriu, kad tu nustotum šnekėti,\r\n\r\nNenoriu girdėti,\r\nNenoriu klausyti,\r\nToliau nuo visu noriu pabėgti.'
                },
                {
                    id: 'three',
                    title: 'Plento Valdovas',
                    artist: 'Demo 2015',
                    duration: '01:21',
                    url:
                        'http://vocaroo.com/media_command.php?media=s08LTKAJdqiS&command=download_mp3',
                    lyrics:
                        'Apsižergęs metalinį žirgą\r\nSusiliejęs su plentu    \r\nPrisišliejęs prie headset\'o\r\nPedalus pasiutusiai suku\r\n\r\nPlentu minu į kalną su vėju\r\nPlentu minu aš pilnas jėgų\r\n\r\nJei paklaustum kur skubu\r\nAtsakyčiau smerkiančiu žvilgsniu:\r\nTen toli už horizonto\r\nVartai į pragaro kurortą\r\n\r\nPlentu minu į kalną su vėju\r\nPlentu minu aš pilnas jėgų\r\n\r\nAdrenalinas\r\nPats puikiausias vitaminas'
                },
                {
                    id: 'four',
                    title: 'Nekenčiu',
                    artist: 'Demo 2015',
                    duration: '01:41',
                    url:
                        'http://vocaroo.com/media_command.php?media=s1qRXIvm4MeX&command=download_mp3',
                    lyrics:
                        'Nekenčiu tvarkos,\r\nNes jos nėra ten kur jos reikia.\r\nNekenčiu bardako,\r\nNes - tai kažkieno tvarka.\r\nNekenčiu istatymų,\r\nNors pats esu vienas iš jų!\r\n\r\nNekenčiu tiesos,\r\nNes ji būna skaudi.\r\nNekenčiu melo,\r\nNes su melu gyventi lengviau.\r\nNekenčiu žmonių,\r\nNes pats esu vienas iš jų!\r\n\r\nNekenčiu meilės,\r\nTai - absurdo drama.\r\nNekenčiu laisvės,\r\nJos niekad nebūna gana.\r\nNekenčiu narkotikų,\r\nNes pats esu vienas iš jų!\r\n\r\nNekenčiu laimės,\r\nNekenčiu meilės,\r\nNekenčiu džiaugsmo,\r\nTodėl ir tavęs.\r\nNekenčiu baimės,\r\nNekenčiu skausmo,\r\nAbsurdo, todėl ir savęs.'
                },
                {
                    id: 'five',
                    title: 'Šuo',
                    artist: 'Demo 2015',
                    duration: '01:23',
                    url:
                        'http://vocaroo.com/media_command.php?media=s1FD49LOG0kg&command=download_mp3',
                    lyrics:
                        'Jonukui mamytė nupirko šuniuką,\r\nNors Jonukas norėjo kačiuko.\r\nŠunį į lauką vesti reikėjo,\r\nTodėl Jonukas šuns nenorėjo.\r\n\r\nŠuo!\r\nŠuo! (miau)\r\n\r\nTačiau Jonukas šunį pamilo,\r\nKvietė jį Brisiaus vardu,\r\nGlostė pilką jo kailį,\r\nKol Brisius myžo ant grindų!\r\n\r\nŠuo!\r\nŠuo! (miau)\r\n\r\nJonas užaugo, jam gimė dukra,\r\nO Brisius paseno ir tapo našta.\r\nKol Jonas korėsi kilpa ant kaklo,\r\nBrisius nugaišo, nes pats susiprato:\r\n\r\nPareiga našta, o meilė kančia!'
                },
                {
                    id: 'six',
                    title: 'Ant Nugaros Alus',
                    artist: 'Demo 2015',
                    duration: '00:56',
                    url:
                        'http://vocaroo.com/media_command.php?media=s0DQbyCp1zcL&command=download_mp3',
                    lyrics:
                        'Sumaišiau tavo galvą su šikna,\r\nTodėl tavo nugara aluje.\r\n\r\nAnt nugaros alus!\r\n\r\nAlaus burnoje nėra,\r\nNugara jau sausa, bet ne, \r\nNugara degtinės baloje.'
                },
                {
                    id: 'seven',
                    title: 'Aš Tikiu',
                    artist: 'Demo 2015',
                    duration: '01:27',
                    url:
                        'http://vocaroo.com/media_command.php?media=s0dJNtThn3Bc&command=download_mp3',
                    lyrics:
                        'Aš tikiu, pasaulis pasikeis \r\n\r\nĖj, supistas pasauli, \r\nNustok vaipytis,\r\nSėdėdami ant dugno \r\nMes mokame šaipytis,\r\nApvertę žemę su dangum,\r\nMes būsime viršum,\r\nManai, kad tai vadinama \r\nAtominiu karu?\r\n\r\nAš tikiu, pasaulis pasikeis \r\n\r\nĖj, supistas seni, nemokyk gyvent,\r\nNuo tavo moralų man norisi vemt, \r\nKada tu suprasi, savęs neprarasti \r\nSupistai sunku.\r\n\r\nAš tikiu, pasaulis pasikeis \r\n(Gal per stipriai pasakyta,\r\nPasaulis pasikeis, išauš toks rytas, \r\nKai sotinsis teisybe alkana burna,\r\nBet tai juk išgalvota Markso doktrina)'
                },
                {
                    id: 'eight',
                    title: 'Durnyne',
                    artist: 'Demo 2015',
                    duration: '00:40',
                    url:
                        'http://vocaroo.com/media_command.php?media=s0jP1X6Tsa7X&command=download_mp3',
                    lyrics:
                        'Durnyne, durnyne, durnyne gyvenu...\r\nDurnyne, durnyne, durnyne gyvenu...\r\n\r\nAš čia netyčia, per klaidą patekau,\r\nNelaiku durnium apsimečiau.\r\n\r\nDurnyne, durnyne, durnyne gyvenu...\r\nDurnyne, durnyne, durnyne gyvenu...\r\n\r\nNorėčiau sakyti daugiau taip nebus,\r\nBet man atrodo aš esu\r\nDurnius'
                }
            ]
        });

        this.albums.push(demo2015);
    }
};