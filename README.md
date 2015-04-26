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
    "glossary" : "../glossary/swa"
}
```

anlegen.


### Glossare /glossary/:id (glossaryItemsList)

__GET__  
unter `/glossary` lassen sich alle angelegte glossaryItems abrufen  

__GET__  
unter `/glossary/:id`, z. B. `/glossary/swa/` lassen sich alle angelegte glossaryItems für einen bestimmten Kurs abrufen  

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
            "de.wikipedia.org" : "http://de.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services"
        }
    ]
}
```

anlegen.


## Impressum

Alexander H.,  
Matthias K.

Hochschule Karlsruhe – Technik und Wirtschaft  
Moltkestr.  
Karlsruhe 