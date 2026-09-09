'use client';

import { useMemo, useState } from 'react';

type Card={id:string;name:string;file:string;essence:string;light:string;shadow:string;};
type Spread={id:number;name:string;subtitle:string;positions:string[];};
type Category={name:string;questions:string[];recommended:number;};

const cards:Card[]=[
["00","El Loco","00-el-loco.png","inicio, libertad y salto hacia lo desconocido","atreverse sin exigir certezas","impulsividad o huida de la responsabilidad"],
["01","El Mago","01-el-mago.png","recursos, iniciativa y capacidad de actuar","agencia y creatividad","dispersión o manipulación"],
["02","La Sacerdotisa","02-la-sacerdotisa.png","silencio, intuición y conocimiento interior","escucha y percepción fina","pasividad, secreto o esperar que el otro adivine"],
["03","La Emperatriz","03-la-emperatriz.png","deseo, creación y aquello que necesita cuidado","nutrir y hacer crecer","sobreproteger o confundir cuidado con control"],
["04","El Emperador","04-el-emperador.png","estructura, límites y responsabilidad","estabilidad y autoridad propia","rigidez o necesidad de controlar"],
["05","El Sacerdote","05-el-sacerdote.png","valores, aprendizaje y marcos compartidos","sentido y guía","dogma o vivir según expectativas ajenas"],
["06","Los Enamorados","06-los-enamorados.png","elección, vínculo y coherencia","elegir desde los valores","indecisión o elegir por miedo a perder"],
["07","El Carro","07-el-carro.png","dirección, voluntad y avance","tomar las riendas","forzar o correr sin integrar fuerzas opuestas"],
["08","La Fuerza","08-la-fuerza.png","coraje sereno e integración del impulso","firmeza sin violencia","contención excesiva o lucha interna"],
["09","El Ermitaño","09-el-ermitano.png","discernimiento, retiro fértil y búsqueda","escuchar la propia verdad","aislamiento o postergar indefinidamente"],
["10","La Rueda de la Fortuna","10-la-rueda-de-la-fortuna.png","cambio de ciclo y factores no controlables","adaptarse al movimiento","pasividad ante el cambio"],
["11","La Justicia","11-la-justicia.png","hechos, límites y responsabilidad","claridad y decisiones sostenibles","juicio frío o autoexigencia"],
["12","El Colgado","12-el-colgado.png","pausa, perspectiva y renuncia a forzar","ver de otra manera","estancamiento o sacrificio sin sentido"],
["13","La Muerte","13-la-muerte.png","fin de una forma y transformación","soltar lo agotado","resistencia al cambio"],
["14","La Templanza","14-la-templanza.png","integración, diálogo, tiempo y equilibrio","regular y mezclar sin borrar diferencias","diluir necesidades o esperar demasiado"],
["15","El Diablo","15-el-diablo.png","deseo, intensidad, apego y poder personal","reconocer el deseo sin negarlo","dependencia, compulsión o vínculo que encadena"],
["16","La Torre","16-la-torre.png","ruptura de una estructura que ya no sostiene","liberación y verdad","caos o aferrarse a lo que cae"],
["17","La Estrella","17-la-estrella.png","confianza, vulnerabilidad e inspiración","recuperar orientación","idealización o esperar una salvación externa"],
["18","La Luna","18-la-luna.png","incertidumbre, proyección, miedo e intuición","dar espacio a lo inconsciente","confundir temor con intuición o fantasía con evidencia"],
["19","El Sol","19-el-sol.png","claridad, vitalidad y evidencia","mostrar y compartir","exceso de certeza o necesidad de reconocimiento"],
["20","El Juicio","20-el-juicio.png","despertar, revisión y llamada a responder","reconocer lo aprendido","culpa o vivir atrapado en el pasado"],
["21","El Mundo","21-el-mundo.png","culminación, integración y cambio de nivel","completar e integrar","cerrar en falso o no reconocer lo conseguido"]
].map(x=>({id:x[0],name:x[1],file:x[2],essence:x[3],light:x[4],shadow:x[5]}));

const spreads:Spread[]=[
{id:1,name:"1 carta",subtitle:"Mensaje",positions:["Lo esencial ahora"]},
{id:2,name:"2 cartas",subtitle:"Situación / orientación",positions:["Situación","Orientación"]},
{id:3,name:"3 cartas",subtitle:"Origen / presente / tendencia",positions:["Origen","Presente","Tendencia"]},
{id:5,name:"5 cartas",subtitle:"Lectura profunda",positions:["Dinámica","En juego","Lo no dicho","Dirección","Clave"]},
{id:7,name:"7 cartas",subtitle:"Lectura profesional",positions:["Contexto","Tensión","Deseo","Miedo","Camino","Clave","Síntesis"]}
];

const categories:Category[]=[
{name:"Amor y relaciones",recommended:5,questions:[
"¿Qué necesito comprender sobre mi relación y hacia dónde se está moviendo?",
"¿Qué dinámica está actuando entre nosotros y qué necesita ser transformado?",
"¿Qué necesito ver con claridad sobre este vínculo?",
"¿Qué estoy aprendiendo a través de esta relación?"
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
]}];

const modes=[
["Lectura profunda","La dinámica emocional, interna y simbólica de la tirada."],
["Relacional","Cómo dialogan las cartas entre sí y qué ocurre en el vínculo."],
["Proceso","La evolución de la primera carta hasta la síntesis final."],
["Práctica","Qué preguntas y movimientos concretos sugiere la lectura."]
];

function narrative(selected:Card[],spread:Spread,q:string,mode:number){
const names=selected.map(c=>c.name).join(" → ");
if(selected.length===1)return `${selected[0].name} concentra la lectura. Ante «${q}», no anuncia un hecho: pone el foco en ${selected[0].essence}. Su luz es ${selected[0].light}; su sombra, ${selected[0].shadow}. La pregunta que queda abierta es qué cambia cuando observas tu situación desde este símbolo.`;
if(selected.length===2)return `La secuencia ${names} funciona como diálogo. ${selected[0].name} describe el terreno —${selected[0].essence}— y ${selected[1].name} modifica la respuesta desde ${selected[1].essence}. La lectura invita a pasar de comprender lo que ocurre a decidir cómo quieres relacionarte con ello.`;
if(selected.length===3)return `La secuencia ${names} forma una trayectoria: el origen aporta la raíz, el presente muestra dónde se concentra la experiencia y la tendencia señala una posibilidad de desarrollo, no un destino. La lectura se vuelve útil al preguntar qué parte del pasado sigue actuando, qué decisión pertenece al presente y qué puede cambiar si esa decisión cambia.`;
if(selected.length===5)return `La secuencia ${names} tiene una arquitectura clara. ${selected[0].name} abre la dinámica; ${selected[1].name} muestra qué está realmente en juego; ${selected[2].name} introduce la zona que todavía no está completamente visible; ${selected[3].name} responde con una dirección posible; y ${selected[4].name} integra el sentido de la tirada. No son cinco definiciones: cada carta modifica la anterior. El movimiento profundo es percibir → elegir → atravesar la incertidumbre → aclarar → integrar.`;
return `La secuencia ${names} funciona como un proceso completo. Contexto y tensión muestran el escenario; deseo y miedo revelan fuerzas que pueden tirar en sentidos opuestos; el camino transforma esa tensión en posibilidad de acción; la clave condensa el aprendizaje y la síntesis devuelve una visión más amplia. La última carta no borra las anteriores: las reinterpreta. La pregunta profesional es qué transformación propone la secuencia y qué parte necesita ser contrastada con la realidad.`;
}

export default function Home(){
const [cat,setCat]=useState(0),[question,setQuestion]=useState(categories[0].questions[0]),[spread,setSpread]=useState(5),[picked,setPicked]=useState<string[]>([]),[reading,setReading]=useState(false),[mode,setMode]=useState(0);
const current=spreads.find(s=>s.id===spread)!;
const selected=useMemo(()=>picked.map(id=>cards.find(c=>c.id===id)!).filter(Boolean),[picked]);
function selectCat(i:number){setCat(i);setQuestion(categories[i].questions[0]);setSpread(categories[i].recommended);setPicked([]);setReading(false)}
function choose(id:string){if(reading)return;setPicked(p=>p.includes(id)?p.filter(x=>x!==id):p.length<spread?[...p,id]:p)}
function random(){setPicked([...cards].sort(()=>Math.random()-.5).slice(0,spread).map(c=>c.id));setReading(false)}
function interpret(){if(picked.length===spread)setReading(true)}
return <main>
<header><div className="logo">CARTAS</div><div className="headerMeta">LECTURA SIMBÓLICA · ARCANOS MAYORES</div></header>

<section className="hero"><div className="eyebrow">01 · La pregunta</div><h1>Empieza por lo que<br/><em>quieres comprender.</em></h1>
<p>Elige un tema o formula tu propia pregunta. CARTAS adapta la profundidad de la lectura a lo que estás buscando.</p>
<div className="categories">{categories.map((c,i)=><button className={cat===i?"category active":"category"} onClick={()=>selectCat(i)} key={c.name}>{c.name}</button>)}</div>
<div className="question"><div className="label">Pregunta</div><div className="questionList">{categories[cat].questions.map(q=><button className={question===q?"qoption active":"qoption"} onClick={()=>setQuestion(q)} key={q}>{q}</button>)}</div><textarea value={question} onChange={e=>setQuestion(e.target.value)} /></div></section>

<section><div className="eyebrow">02 · Profundidad</div><h2>Elige cómo quieres leer.</h2><div className="spreads">{spreads.map(s=><button className={spread===s.id?"spread active":"spread"} onClick={()=>{setSpread(s.id);setPicked([]);setReading(false)}} key={s.id}><strong>{s.name}</strong><span>{s.subtitle}</span></button>)}</div>
<div className="recommend">Para esta pregunta, recomendamos <b>{spreads.find(s=>s.id===categories[cat].recommended)?.name}</b> · {spreads.find(s=>s.id===categories[cat].recommended)?.subtitle}</div></section>

<section><div className="eyebrow">03 · La elección</div><div className="pickTitle"><h2>Elige tus {spread===1?"carta":"cartas"}</h2><span>{picked.length} / {spread}</span></div><p className="hint">El orden de elección crea la secuencia de la lectura. También puedes dejar que CARTAS las elija por ti.</p>
<div className="deck">{cards.map(c=><button className={picked.includes(c.id)?"tarot picked":"tarot"} key={c.id} onClick={()=>choose(c.id)}><img src={`/cards/${c.file}`} alt={c.name}/><span>{c.name}</span>{picked.includes(c.id)&&<i>{picked.indexOf(c.id)+1}</i>}</button>)}</div>
<div className="actions"><button className="primary" disabled={picked.length!==spread} onClick={interpret}>Revelar interpretación</button><button className="secondary" onClick={random}>Elegir por azar</button><button className="secondary" onClick={()=>{setPicked([]);setReading(false)}}>Empezar de nuevo</button></div></section>

{reading&&<section className="result"><div className="eyebrow">04 · La lectura</div><h2>Lo que cuenta tu tirada</h2><div className="echo">«{question}»</div>
<div className="readingModes">{modes.map((m,i)=><button className={mode===i?"mode active":"mode"} onClick={()=>setMode(i)} key={m[0]}><b>{m[0]}</b><span>{m[1]}</span></button>)}</div>
<div className="resultCards">{selected.map((c,i)=><article key={c.id}><div className="resultImg"><img src={`/cards/${c.file}`} alt={c.name}/></div><div className="position">{String(i+1).padStart(2,"0")} · {current.positions[i]}</div><h3>{c.name}</h3><p>{c.essence}</p><details><summary>Profundizar</summary><p><b>Luz:</b> {c.light}. <b>Sombra:</b> {c.shadow}. En esta posición, pregunta qué aporta este arcano a «{question}» y qué cambia al leerlo junto a las cartas vecinas.</p></details></article>)}</div>
<div className="story"><div className="label">Narración conjunta · {modes[mode][0]}</div><p>{narrative(selected,current,question,mode)}</p></div>
<div className="closing"><b>Una última pregunta</b><p>¿Qué parte de esta lectura reconoces en tu realidad y qué parte necesitas comprobar antes de actuar?</p></div>
</section>}
<footer>El tarot se presenta aquí como lenguaje simbólico de reflexión. No determina hechos futuros ni sustituye el criterio personal.</footer>
</main>
}
