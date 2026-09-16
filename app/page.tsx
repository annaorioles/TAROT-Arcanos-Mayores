'use client';

import { useMemo, useState } from 'react';

type Card={id:string;name:string;file:string;essence:string;light:string;shadow:string;};
type Spread={id:number;name:string;subtitle:string;positions:string[];};
type Category={name:string;questions:string[];recommended:number;};

const cards:Card[]=[
  ["00", "El Loco", "00-el-loco.png", "inicio, libertad y salto hacia lo desconocido", "atreverse sin exigir certezas", "impulsividad o huida de la responsabilidad"],
  ["01", "El Mago", "01-el-mago.png", "recursos, iniciativa y capacidad de actuar", "agencia y creatividad", "dispersión o manipulación"],
  ["02", "La Sacerdotisa", "02-la-sacerdotisa.png", "silencio, intuición y conocimiento interior", "escucha y percepción fina", "pasividad, secreto o esperar que el otro adivine"],
  ["03", "La Emperatriz", "03-la-emperatriz.png", "deseo, creación y aquello que necesita cuidado", "nutrir y hacer crecer", "sobreproteger o confundir cuidado con control"],
  ["04", "El Emperador", "04-el-emperador.png", "estructura, límites y responsabilidad", "estabilidad y autoridad propia", "rigidez o necesidad de controlar"],
  ["05", "El Sacerdote", "05-el-sacerdote.png", "valores, aprendizaje y marcos compartidos", "sentido y guía", "dogma o vivir según expectativas ajenas"],
  ["06", "Los Enamorados", "06-los-enamorados.png", "elección, vínculo y coherencia", "elegir desde los valores", "indecisión o elegir por miedo a perder"],
  ["07", "El Carro", "07-el-carro.png", "dirección, voluntad y avance", "tomar las riendas", "forzar o correr sin integrar fuerzas opuestas"],
  ["08", "La Fuerza", "08-la-fuerza.png", "coraje sereno e integración del impulso", "firmeza sin violencia", "contención excesiva o lucha interna"],
  ["09", "El Ermitaño", "09-el-ermitano.png", "discernimiento, retiro fértil y búsqueda", "escuchar la propia verdad", "aislamiento o postergar indefinidamente"],
  ["10", "La Rueda de la Fortuna", "10-la-rueda-de-la-fortuna.png", "cambio de ciclo y factores no controlables", "adaptarse al movimiento", "pasividad ante el cambio"],
  ["11", "La Justicia", "11-la-justicia.png", "hechos, límites y responsabilidad", "claridad y decisiones sostenibles", "juicio frío o autoexigencia"],
  ["12", "El Colgado", "12-el-colgado.png", "pausa, perspectiva y renuncia a forzar", "ver de otra manera", "estancamiento o sacrificio sin sentido"],
  ["13", "La Muerte", "13-la-muerte.png", "fin de una forma y transformación", "soltar lo agotado", "resistencia al cambio"],
  ["14", "La Templanza", "14-la-templanza.png", "integración, diálogo, tiempo y equilibrio", "regular y mezclar sin borrar diferencias", "diluir necesidades o esperar demasiado"],
  ["15", "El Diablo", "15-el-diablo.png", "deseo, intensidad, apego y poder personal", "reconocer el deseo sin negarlo", "dependencia, compulsión o vínculo que encadena"],
  ["16", "La Torre", "16-la-torre.png", "ruptura de una estructura que ya no sostiene", "liberación y verdad", "caos o aferrarse a lo que cae"],
  ["17", "La Estrella", "17-la-estrella.png", "confianza, vulnerabilidad e inspiración", "recuperar orientación", "idealización o esperar una salvación externa"],
  ["18", "La Luna", "18-la-luna.png", "incertidumbre, proyección, miedo e intuición", "dar espacio a lo inconsciente", "confundir temor con intuición o fantasía con evidencia"],
  ["19", "El Sol", "19-el-sol.png", "claridad, vitalidad y evidencia", "mostrar y compartir", "exceso de certeza o necesidad de reconocimiento"],
  ["20", "El Juicio", "20-el-juicio.png", "despertar, revisión y llamada a responder", "reconocer lo aprendido", "culpa o vivir atrapado en el pasado"],
  ["21", "El Mundo", "21-el-mundo.png", "culminación, integración y cambio de nivel", "completar e integrar", "cerrar en falso o no reconocer lo conseguido"],
  ["22", "As de Copas", "22-as-de-copas.png", "inicio y potencial de la energía del palo, en el ámbito de emociones, vínculos y mundo afectivo", "abrir una posibilidad y darle espacio", "no reconocer o no canalizar el potencial"],
  ["23", "Dos de Copas", "23-dos-de-copas.png", "encuentro, equilibrio y primera relación con la energía del palo, en el ámbito de emociones, vínculos y mundo afectivo", "crear reciprocidad y elegir con conciencia", "quedarse entre dos posiciones sin integrar"],
  ["24", "Tres de Copas", "24-tres-de-copas.png", "desarrollo, expresión y expansión inicial, en el ámbito de emociones, vínculos y mundo afectivo", "hacer crecer lo iniciado mediante intercambio", "dispersar la energía o avanzar sin revisar"],
  ["25", "Cuatro de Copas", "25-cuatro-de-copas.png", "estructura, pausa y necesidad de estabilidad, en el ámbito de emociones, vínculos y mundo afectivo", "consolidar y reconocer lo construido", "aferrarse a una seguridad aparente"],
  ["26", "Cinco de Copas", "26-cinco-de-copas.png", "fricción, cambio y desafío dentro del palo, en el ámbito de emociones, vínculos y mundo afectivo", "aprender de la tensión y reorganizar la energía", "convertir el conflicto en lucha estéril"],
  ["27", "Seis de Copas", "27-seis-de-copas.png", "movimiento, equilibrio y recuperación de lo aprendido, en el ámbito de emociones, vínculos y mundo afectivo", "integrar experiencia y avanzar", "buscar aprobación o repetir una fórmula conocida"],
  ["28", "Siete de Copas", "28-siete-de-copas.png", "evaluación, posición y defensa de lo que importa, en el ámbito de emociones, vínculos y mundo afectivo", "sostener una elección con criterio", "quedarse a la defensiva o dispersar esfuerzos"],
  ["29", "Ocho de Copas", "29-ocho-de-copas.png", "movimiento, práctica o aceleración de la energía, en el ámbito de emociones, vínculos y mundo afectivo", "dar continuidad y convertir intención en acción", "exceso, bloqueo o precipitación"],
  ["30", "Nueve de Copas", "30-nueve-de-copas.png", "madurez, resistencia y fruto de la experiencia, en el ámbito de emociones, vínculos y mundo afectivo", "reconocer la propia capacidad", "desconfianza, agotamiento o autosuficiencia rígida"],
  ["31", "Diez de Copas", "31-diez-de-copas.png", "culminación, carga o integración del ciclo, en el ámbito de emociones, vínculos y mundo afectivo", "cerrar un ciclo y distribuir mejor la energía", "seguir sosteniendo una carga que ya pide transformación"],
  ["32", "Sota de Copas", "32-sota-de-copas.png", "aprendizaje, curiosidad y comienzo consciente, en el ámbito de emociones, vínculos y mundo afectivo", "explorar y aprender con apertura", "inmadurez o falta de continuidad"],
  ["33", "Caballero de Copas", "33-caballero-de-copas.png", "movimiento, iniciativa y expresión activa, en el ámbito de emociones, vínculos y mundo afectivo", "llevar la energía hacia una experiencia", "precipitación o dificultad para sostener el rumbo"],
  ["34", "Reina de Copas", "34-reina-de-copas.png", "madurez, presencia y dominio sensible de la energía, en el ámbito de emociones, vínculos y mundo afectivo", "encarnar la cualidad del palo con autonomía", "control, exceso de entrega o necesidad de demostrar"],
  ["35", "Rey de Copas", "35-rey-de-copas.png", "dominio, experiencia y capacidad de dirección, en el ámbito de emociones, vínculos y mundo afectivo", "dirigir recursos con visión y responsabilidad", "rigidez, control o identificación excesiva con el poder"],
  ["36", "As de Espadas", "36-as-de-espadas.png", "inicio y potencial de la energía del palo, en el ámbito de pensamiento, verdad y conflicto mental", "abrir una posibilidad y darle espacio", "no reconocer o no canalizar el potencial"],
  ["37", "Dos de Espadas", "37-dos-de-espadas.png", "encuentro, equilibrio y primera relación con la energía del palo, en el ámbito de pensamiento, verdad y conflicto mental", "crear reciprocidad y elegir con conciencia", "quedarse entre dos posiciones sin integrar"],
  ["38", "Tres de Espadas", "38-tres-de-espadas.png", "desarrollo, expresión y expansión inicial, en el ámbito de pensamiento, verdad y conflicto mental", "hacer crecer lo iniciado mediante intercambio", "dispersar la energía o avanzar sin revisar"],
  ["39", "Cuatro de Espadas", "39-cuatro-de-espadas.png", "estructura, pausa y necesidad de estabilidad, en el ámbito de pensamiento, verdad y conflicto mental", "consolidar y reconocer lo construido", "aferrarse a una seguridad aparente"],
  ["40", "Cinco de Espadas", "40-cinco-de-espadas.png", "fricción, cambio y desafío dentro del palo, en el ámbito de pensamiento, verdad y conflicto mental", "aprender de la tensión y reorganizar la energía", "convertir el conflicto en lucha estéril"],
  ["41", "Seis de Espadas", "41-seis-de-espadas.png", "movimiento, equilibrio y recuperación de lo aprendido, en el ámbito de pensamiento, verdad y conflicto mental", "integrar experiencia y avanzar", "buscar aprobación o repetir una fórmula conocida"],
  ["42", "Siete de Espadas", "42-siete-de-espadas.png", "evaluación, posición y defensa de lo que importa, en el ámbito de pensamiento, verdad y conflicto mental", "sostener una elección con criterio", "quedarse a la defensiva o dispersar esfuerzos"],
  ["43", "Ocho de Espadas", "43-ocho-de-espadas.png", "movimiento, práctica o aceleración de la energía, en el ámbito de pensamiento, verdad y conflicto mental", "dar continuidad y convertir intención en acción", "exceso, bloqueo o precipitación"],
  ["44", "Nueve de Espadas", "44-nueve-de-espadas.png", "madurez, resistencia y fruto de la experiencia, en el ámbito de pensamiento, verdad y conflicto mental", "reconocer la propia capacidad", "desconfianza, agotamiento o autosuficiencia rígida"],
  ["45", "Diez de Espadas", "45-diez-de-espadas.png", "culminación, carga o integración del ciclo, en el ámbito de pensamiento, verdad y conflicto mental", "cerrar un ciclo y distribuir mejor la energía", "seguir sosteniendo una carga que ya pide transformación"],
  ["46", "Sota de Espadas", "46-sota-de-espadas.png", "aprendizaje, curiosidad y comienzo consciente, en el ámbito de pensamiento, verdad y conflicto mental", "explorar y aprender con apertura", "inmadurez o falta de continuidad"],
  ["47", "Caballero de Espadas", "47-caballero-de-espadas.png", "movimiento, iniciativa y expresión activa, en el ámbito de pensamiento, verdad y conflicto mental", "llevar la energía hacia una experiencia", "precipitación o dificultad para sostener el rumbo"],
  ["48", "Reina de Espadas", "48-reina-de-espadas.png", "madurez, presencia y dominio sensible de la energía, en el ámbito de pensamiento, verdad y conflicto mental", "encarnar la cualidad del palo con autonomía", "control, exceso de entrega o necesidad de demostrar"],
  ["49", "Rey de Espadas", "49-rey-de-espadas.png", "dominio, experiencia y capacidad de dirección, en el ámbito de pensamiento, verdad y conflicto mental", "dirigir recursos con visión y responsabilidad", "rigidez, control o identificación excesiva con el poder"],
  ["50", "As de Bastos", "50-as-de-bastos.png", "inicio y potencial de la energía del palo, en el ámbito de energía, deseo, acción y creatividad", "abrir una posibilidad y darle espacio", "no reconocer o no canalizar el potencial"],
  ["51", "Dos de Bastos", "51-dos-de-bastos.png", "encuentro, equilibrio y primera relación con la energía del palo, en el ámbito de energía, deseo, acción y creatividad", "crear reciprocidad y elegir con conciencia", "quedarse entre dos posiciones sin integrar"],
  ["52", "Tres de Bastos", "52-tres-de-bastos.png", "desarrollo, expresión y expansión inicial, en el ámbito de energía, deseo, acción y creatividad", "hacer crecer lo iniciado mediante intercambio", "dispersar la energía o avanzar sin revisar"],
  ["53", "Cuatro de Bastos", "53-cuatro-de-bastos.png", "estructura, pausa y necesidad de estabilidad, en el ámbito de energía, deseo, acción y creatividad", "consolidar y reconocer lo construido", "aferrarse a una seguridad aparente"],
  ["54", "Cinco de Bastos", "54-cinco-de-bastos.png", "fricción, cambio y desafío dentro del palo, en el ámbito de energía, deseo, acción y creatividad", "aprender de la tensión y reorganizar la energía", "convertir el conflicto en lucha estéril"],
  ["55", "Seis de Bastos", "55-seis-de-bastos.png", "movimiento, equilibrio y recuperación de lo aprendido, en el ámbito de energía, deseo, acción y creatividad", "integrar experiencia y avanzar", "buscar aprobación o repetir una fórmula conocida"],
  ["56", "Siete de Bastos", "56-siete-de-bastos.png", "evaluación, posición y defensa de lo que importa, en el ámbito de energía, deseo, acción y creatividad", "sostener una elección con criterio", "quedarse a la defensiva o dispersar esfuerzos"],
  ["57", "Ocho de Bastos", "57-ocho-de-bastos.png", "movimiento, práctica o aceleración de la energía, en el ámbito de energía, deseo, acción y creatividad", "dar continuidad y convertir intención en acción", "exceso, bloqueo o precipitación"],
  ["58", "Nueve de Bastos", "58-nueve-de-bastos.png", "madurez, resistencia y fruto de la experiencia, en el ámbito de energía, deseo, acción y creatividad", "reconocer la propia capacidad", "desconfianza, agotamiento o autosuficiencia rígida"],
  ["59", "Diez de Bastos", "59-diez-de-bastos.png", "culminación, carga o integración del ciclo, en el ámbito de energía, deseo, acción y creatividad", "cerrar un ciclo y distribuir mejor la energía", "seguir sosteniendo una carga que ya pide transformación"],
  ["60", "Sota de Bastos", "60-sota-de-bastos.png", "aprendizaje, curiosidad y comienzo consciente, en el ámbito de energía, deseo, acción y creatividad", "explorar y aprender con apertura", "inmadurez o falta de continuidad"],
  ["61", "Caballero de Bastos", "61-caballero-de-bastos.png", "movimiento, iniciativa y expresión activa, en el ámbito de energía, deseo, acción y creatividad", "llevar la energía hacia una experiencia", "precipitación o dificultad para sostener el rumbo"],
  ["62", "Reina de Bastos", "62-reina-de-bastos.png", "madurez, presencia y dominio sensible de la energía, en el ámbito de energía, deseo, acción y creatividad", "encarnar la cualidad del palo con autonomía", "control, exceso de entrega o necesidad de demostrar"],
  ["63", "Rey de Bastos", "63-rey-de-bastos.png", "dominio, experiencia y capacidad de dirección, en el ámbito de energía, deseo, acción y creatividad", "dirigir recursos con visión y responsabilidad", "rigidez, control o identificación excesiva con el poder"],
  ["64", "As de Oros", "64-as-de-oros.png", "inicio y potencial de la energía del palo, en el ámbito de materia, recursos, cuerpo y construcción", "abrir una posibilidad y darle espacio", "no reconocer o no canalizar el potencial"],
  ["65", "Dos de Oros", "65-dos-de-oros.png", "encuentro, equilibrio y primera relación con la energía del palo, en el ámbito de materia, recursos, cuerpo y construcción", "crear reciprocidad y elegir con conciencia", "quedarse entre dos posiciones sin integrar"],
  ["66", "Tres de Oros", "66-tres-de-oros.png", "desarrollo, expresión y expansión inicial, en el ámbito de materia, recursos, cuerpo y construcción", "hacer crecer lo iniciado mediante intercambio", "dispersar la energía o avanzar sin revisar"],
  ["67", "Cuatro de Oros", "67-cuatro-de-oros.png", "estructura, pausa y necesidad de estabilidad, en el ámbito de materia, recursos, cuerpo y construcción", "consolidar y reconocer lo construido", "aferrarse a una seguridad aparente"],
  ["68", "Cinco de Oros", "68-cinco-de-oros.png", "fricción, cambio y desafío dentro del palo, en el ámbito de materia, recursos, cuerpo y construcción", "aprender de la tensión y reorganizar la energía", "convertir el conflicto en lucha estéril"],
  ["69", "Seis de Oros", "69-seis-de-oros.png", "movimiento, equilibrio y recuperación de lo aprendido, en el ámbito de materia, recursos, cuerpo y construcción", "integrar experiencia y avanzar", "buscar aprobación o repetir una fórmula conocida"],
  ["70", "Siete de Oros", "70-siete-de-oros.png", "evaluación, posición y defensa de lo que importa, en el ámbito de materia, recursos, cuerpo y construcción", "sostener una elección con criterio", "quedarse a la defensiva o dispersar esfuerzos"],
  ["71", "Ocho de Oros", "71-ocho-de-oros.png", "movimiento, práctica o aceleración de la energía, en el ámbito de materia, recursos, cuerpo y construcción", "dar continuidad y convertir intención en acción", "exceso, bloqueo o precipitación"],
  ["72", "Nueve de Oros", "72-nueve-de-oros.png", "madurez, resistencia y fruto de la experiencia, en el ámbito de materia, recursos, cuerpo y construcción", "reconocer la propia capacidad", "desconfianza, agotamiento o autosuficiencia rígida"],
  ["73", "Diez de Oros", "73-diez-de-oros.png", "culminación, carga o integración del ciclo, en el ámbito de materia, recursos, cuerpo y construcción", "cerrar un ciclo y distribuir mejor la energía", "seguir sosteniendo una carga que ya pide transformación"],
  ["74", "Sota de Oros", "74-sota-de-oros.png", "aprendizaje, curiosidad y comienzo consciente, en el ámbito de materia, recursos, cuerpo y construcción", "explorar y aprender con apertura", "inmadurez o falta de continuidad"],
  ["75", "Caballero de Oros", "75-caballero-de-oros.png", "movimiento, iniciativa y expresión activa, en el ámbito de materia, recursos, cuerpo y construcción", "llevar la energía hacia una experiencia", "precipitación o dificultad para sostener el rumbo"],
  ["76", "Reina de Oros", "76-reina-de-oros.png", "madurez, presencia y dominio sensible de la energía, en el ámbito de materia, recursos, cuerpo y construcción", "encarnar la cualidad del palo con autonomía", "control, exceso de entrega o necesidad de demostrar"],
  ["77", "Rey de Oros", "77-rey-de-oros.png", "dominio, experiencia y capacidad de dirección, en el ámbito de materia, recursos, cuerpo y construcción", "dirigir recursos con visión y responsabilidad", "rigidez, control o identificación excesiva con el poder"],
].map(x=>({id:x[0],name:x[1],file:x[2],essence:x[3],light:x[4],shadow:x[5]}));

const spreads:Spread[]=[
 {id:1,name:"1 carta",subtitle:"Mensaje",positions:["Lo esencial ahora"]},
 {id:2,name:"2 cartas",subtitle:"Situación / orientación",positions:["Situación","Orientación"]},
 {id:3,name:"3 cartas",subtitle:"Origen / presente / tendencia",positions:["Origen","Presente","Tendencia"]},
 {id:31,name:"YO · EL OTRO · EL VÍNCULO",subtitle:"Lectura de relación",positions:["YO","EL OTRO","EL VÍNCULO"]},
 {id:5,name:"5 cartas",subtitle:"Lectura profunda",positions:["Dinámica","En juego","Lo no dicho","Dirección","Clave"]},
 {id:7,name:"7 cartas",subtitle:"Lectura profesional",positions:["Contexto","Tensión","Deseo","Miedo","Camino","Clave","Síntesis"]}
];

const categories:Category[]=[
 {name:"Amor y relaciones",recommended:31,questions:[
 "¿Qué necesito comprender sobre mi relación y hacia dónde se está moviendo?",
 "¿Qué piensa esta persona sobre nuestra situación?",
 "¿Qué siente esta persona respecto a mí y al vínculo?",
 "¿Qué intenciones muestra esta persona en relación con el vínculo?",
 "¿Qué está ocurriendo realmente entre nosotros?",
 "¿Qué necesito ver con claridad sobre este vínculo?"
 ]},
 {name:"Una decisión",recommended:5,questions:[
 "¿Qué necesito ver con claridad antes de tomar esta decisión?",
 "¿Qué estoy evitando considerar en esta elección?",
 "¿Qué me ayudará a elegir de forma coherente conmigo?",
 "¿Qué diferencia realmente los dos caminos que tengo delante?"
 ]},
 {name:"Trabajo y propósito",recommended:3,questions:[
 "¿Qué está pidiendo transformarse en mi vida profesional?",
 "¿Dónde está mi energía más fértil ahora?",
 "¿Qué necesito comprender sobre mi próximo paso profesional?"
 ]},
 {name:"Crecimiento personal",recommended:3,questions:[
 "¿Qué patrón necesito reconocer para avanzar?",
 "¿Qué parte de mí necesita atención en este momento?",
 "¿Qué aprendizaje está intentando abrirse paso?"
 ]},
 {name:"Pregunta libre",recommended:3,questions:[
 "¿Qué necesito comprender de la situación que estoy viviendo?",
 "¿Qué no estoy viendo todavía con suficiente claridad?",
 "¿Qué pregunta debería hacerme ahora?"
 ]}
];

const modes=[
 ["Lectura profunda","La dinámica emocional, interna y simbólica de la tirada."],
 ["Relacional","Cómo dialogan las cartas entre sí y qué ocurre en el vínculo."],
 ["Proceso","La evolución de la primera carta hasta la síntesis final."],
 ["Práctica","Qué preguntas y movimientos concretos sugiere la lectura."]
];

function narrative(selected:Card[],spread:Spread,q:string,mode:number){
 const names=selected.map(c=>c.name).join(" → ");
 if(spread.id===31&&selected.length===3)return `La secuencia ${names} se lee como una dinámica de tres planos: YO, EL OTRO y EL VÍNCULO. La primera carta muestra tu posición ante la pregunta; la segunda representa la dinámica que puede observarse en la otra persona sin convertir el símbolo en una afirmación literal sobre su mente; la tercera muestra la cualidad que toma el vínculo entre ambos. Para profundizar en «${q}», observa especialmente dónde se complementan, se tensan o se transforman las tres cartas.`;
 if(selected.length===1)return `${selected[0].name} concentra la lectura. Ante «${q}», no anuncia un hecho: pone el foco en ${selected[0].essence}. Su luz es ${selected[0].light}; su sombra, ${selected[0].shadow}. La pregunta que queda abierta es qué cambia cuando observas tu situación desde este símbolo.`;
 if(selected.length===2)return `La secuencia ${names} funciona como diálogo. ${selected[0].name} describe el terreno —${selected[0].essence}— y ${selected[1].name} modifica la respuesta desde ${selected[1].essence}. La lectura invita a pasar de comprender lo que ocurre a decidir cómo quieres relacionarte con ello.`;
 if(selected.length===3)return `La secuencia ${names} forma una trayectoria: el origen aporta la raíz, el presente muestra dónde se concentra la experiencia y la tendencia señala una posibilidad de desarrollo, no un destino. La lectura se vuelve útil al preguntar qué parte del pasado sigue actuando, qué decisión pertenece al presente y qué puede cambiar si esa decisión cambia.`;
 if(selected.length===5)return `La secuencia ${names} tiene una arquitectura clara. ${selected[0].name} abre la dinámica; ${selected[1].name} muestra qué está realmente en juego; ${selected[2].name} introduce la zona que todavía no está completamente visible; ${selected[3].name} responde con una dirección posible; y ${selected[4].name} integra el sentido de la tirada. No son cinco definiciones: cada carta modifica la anterior.
El movimiento profundo es percibir → elegir → atravesar la incertidumbre → aclarar → integrar.`;
 return `La secuencia ${names} funciona como un proceso completo. Contexto y tensión muestran el escenario; deseo y miedo revelan fuerzas que pueden tirar en sentidos opuestos; el camino transforma esa tensión en posibilidad de acción; la clave condensa el aprendizaje y la síntesis devuelve una visión más amplia. La última carta no borra las anteriores: las reinterpreta. La pregunta profesional es qué transformación propone la secuencia y qué parte necesita ser contrastada con la realidad.`;
}

export default function Home(){
 const shuffleIds=()=>[...cards].sort(()=>Math.random()-.5).map(c=>c.id);
 const [cat,setCat]=useState(0),[question,setQuestion]=useState(categories[0].questions[0]),[spread,setSpread]=useState(31),[picked,setPicked]=useState<string[]>([]),[reading,setReading]=useState(false),[mode,setMode]=useState(0),[deckOrder,setDeckOrder]=useState<string[]>(shuffleIds);
 const current=spreads.find(s=>s.id===spread)!;
 const selected=useMemo(()=>picked.map(id=>cards.find(c=>c.id===id)!).filter(Boolean),[picked]);
 function resetDeck(){setDeckOrder(shuffleIds());setPicked([]);setReading(false)}
 function selectCat(i:number){setCat(i);setQuestion(categories[i].questions[0]);setSpread(categories[i].recommended);resetDeck()}
 function choose(id:string){if(reading)return;setPicked(p=>p.includes(id)?p.filter(x=>x!==id):p.length<spread?[...p,id]:p)}
 function random(){const order=shuffleIds();setDeckOrder(order);setPicked(order.slice(0,spread));setReading(false)}
 function interpret(){if(picked.length===spread)setReading(true)}
 return <main>
 <header><div className="logo">CARTAS</div><div className="headerMeta">LECTURA SIMBÓLICA · 78 CARTAS</div></header>
 <section className="hero"><div className="eyebrow">01 · La pregunta</div><h1>Empieza por lo que<br/><em>quieres comprender.</em></h1><p>Elige un tema o formula tu propia pregunta. CARTAS adapta la profundidad de la lectura a lo que estás buscando.</p>
 <div className="categories">{categories.map((c,i)=><button className={cat===i?"category active":"category"} onClick={()=>selectCat(i)} key={c.name}>{c.name}</button>)}</div>
 <div className="question"><div className="label">Pregunta</div><div className="questionList">{categories[cat].questions.map(q=><button className={question===q?"qoption active":"qoption"} onClick={()=>setQuestion(q)} key={q}>{q}</button>)}</div><textarea value={question} onChange={e=>setQuestion(e.target.value)}/></div></section>
 <section><div className="eyebrow">02 · Profundidad</div><h2>Elige cómo quieres leer.</h2><div className="spreads">{spreads.map(s=><button className={spread===s.id?"spread active":"spread"} onClick={()=>{setSpread(s.id);setPicked([]);setReading(false)}} key={s.id}><strong>{s.name}</strong><span>{s.subtitle}</span></button>)}</div><div className="recommend">Para esta pregunta, recomendamos <b>{spreads.find(s=>s.id===categories[cat].recommended)?.name}</b> · {spreads.find(s=>s.id===categories[cat].recommended)?.subtitle}</div></section>
 <section><div className="eyebrow">03 · La elección</div><div className="pickTitle"><h2>Elige tus {spread===1?"carta":"cartas"}</h2><span>{picked.length} / {spread}</span></div><p className="hint">La baraja se mezcla automáticamente. Todas las cartas empiezan del revés. Elige una carta y se revela para ocupar su posición en la tirada.</p>
 <div className="deck">{deckOrder.map(id=>{const c=cards.find(card=>card.id===id)!;const isPicked=picked.includes(c.id);return <button className={isPicked?"tarot picked":"tarot"} key={c.id} onClick={()=>choose(c.id)} aria-label={isPicked?c.name:"Carta boca abajo"}>{isPicked?<img src={`/cards/${c.file}`} alt={c.name}/>:<span className="cardBack" aria-hidden="true"><span>CARTAS</span><b>✦</b></span>}{isPicked&&<span className="cardName">{c.name}</span>}{isPicked&&<i>{picked.indexOf(c.id)+1}</i>}</button>})}</div>
 <div className="actions"><button className="primary" disabled={picked.length!==spread} onClick={interpret}>Revelar interpretación</button><button className="secondary" onClick={random}>Elegir por azar</button><button className="secondary" onClick={resetDeck}>Empezar de nuevo</button></div></section>
 {reading&&<section className="result"><div className="eyebrow">04 · La lectura</div><h2>Lo que cuenta tu tirada</h2><div className="echo">«{question}»</div>
 <div className="readingModes">{modes.map((m,i)=><button className={mode===i?"mode active":"mode"} onClick={()=>setMode(i)} key={m[0]}><b>{m[0]}</b><span>{m[1]}</span></button>)}</div>
 <div className="resultCards">{selected.map((c,i)=><article key={c.id}><div className="resultImg"><img src={`/cards/${c.file}`} alt={c.name}/></div><div className="position">{String(i+1).padStart(2,"0")} · {current.positions[i]}</div><h3>{c.name}</h3><p>{c.essence}</p><details><summary>Profundizar</summary><p><b>Luz:</b> {c.light}. <b>Sombra:</b> {c.shadow}. En esta posición, pregunta qué aporta este arcano a «{question}» y qué cambia al leerlo junto a las cartas vecinas.</p></details></article>)}</div>
 <div className="story"><div className="label">Narración conjunta · {modes[mode][0]}</div><p>{narrative(selected,current,question,mode)}</p></div><div className="closing"><b>Una última pregunta</b><p>¿Qué parte de esta lectura reconoces en tu realidad y qué parte necesitas comprobar antes de actuar?</p></div></section>}
 <footer>El tarot se presenta aquí como lenguaje simbólico de reflexión. No determina hechos futuros ni sustituye el criterio personal.</footer>
 </main>;
}
