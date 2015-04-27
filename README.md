# swe-node
SWE, Gruppe 19


## Doku

Was man hier alles machen kann...


### Kurse /courses

__GET__  
unter `/courses` lassen sich angelegte Kurse abrufen  

__POST__  
unter `/courses` lassen sich neue Kurse im Format

``` json
{
    "id" : "SWA",
    "name" : "Softwarearchitektur",
    "lectures" : [{"Mondays" : "09:50-11:20"}, {"Thursdays" : "09:50-11:20"}]
}
```

anlegen.  


### Glossare /glossary/[:id] (glossaryItemsList)

__GET__  
unter `/glossary` lassen sich alle angelegte glossaryItems abrufen  

__GET__  
unter `/glossary/:course`, z. B. `/glossary/swa/` lassen sich alle angelegte glossaryItems für einen bestimmten Kurs abrufen  

__POST__  
unter `/glossary` lassen sich neue Kurse im Format

``` json
{
    "course" : "SWA",
    "id" : "jaxrs",
    "name" : "JAX-RS",
    "longname" : "Java API for RESTful Web Services",
    "descr" : "Bei der Java API for RESTful Web Services, kurz JAX-RS, handelt es sich um ...",
    "sources" : [ 
        {
            "1" : "http://de.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services"
        },
        {
            "2" : "https://jax-rs-spec.java.net/"
        },
        
    ]
}
```

anlegen.  

__PUT__  
unter `/gloassary/:id` lässt sich ein glossaryItem mit der gegebenen ID und JSON body nach gleichem Muster wie unter **POST** modifizieren.  
Beispiel: PUT `/glossary/jaxrs` ändert den Glossareintrag zum Thema JAX-RS.  


__DELETE__  
unter `/gloassary/:id` lässt sich ein glossaryItem mit der gegebenen ID löschen.  
Beispiel: PUT `/glossary/jaxrs` löscht den Glossareintrag zum Thema JAX-RS.  


### Hinweise

Im entsprechenden lokalen Verzeichnis aufrufen:
`git clone https://github.com/mattriseabove/swe-node`

Darin das verzwichnis `/data` anlegen, für die mongodb Instanz.
(da wir lokal entwickeln un die DB später übers Web aufgerufen wird, ist dieses Verzeichnis in der `.gitignore`.)

Initial dependencies aus der package.json installieren.
`npm install` bzw. `npm update`

mongodb lokal installieren und dort im bin mit 
`mongod --dbpath C:\Repos\swe-node\data`
die Datenbank starten.
Im client (z. B. mongo.exe oder Robomongo) mit `use swe-node` database erzeugen.
Collections namens `coursecollection` und `glossarycollection` anlegen.


## Impressum

Alexander H.,  
Matthias K.

Hochschule Karlsruhe – Technik und Wirtschaft  
Moltkestr.  
Karlsruhe 