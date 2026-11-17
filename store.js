/* Kho dữ liệu bộ bài – lưu trong IndexedDB của trình duyệt (không cần server, không cần Firebase). */
(function(){
'use strict';
const THEMES=[
 {id:'deep',name:'Deep',sub:'Tâm sự',color:'#7b8cff'},
 {id:'funny',name:'Funny',sub:'Vui nhộn',color:'#ffb23f'},
 {id:'friends',name:'Friends',sub:'Bạn bè',color:'#3fd9a0'},
 {id:'challenge',name:'Challenge',sub:'Thử thách',color:'#ff5a73'}
];
const DEFAULTS={
deep:['Điều gì khiến bạn thấy mình trưởng thành nhất trong một năm qua?','Nỗi sợ nào bạn ít khi kể với ai?','Khoảnh khắc nào trong đời bạn muốn quay lại thêm một lần nữa?','Điều gì bạn đã tha thứ được nhưng mất rất lâu mới làm được?','Nếu được nói một câu với bản thân năm 16 tuổi, bạn sẽ nói gì?','Điều gì ở bản thân mà bạn vẫn chưa thật sự chấp nhận?','Ai là người đã thay đổi cách bạn nhìn cuộc sống? Vì sao?','Bạn đang cố gắng vì điều gì mà chưa ai biết?','Lần gần nhất bạn khóc là khi nào, vì chuyện gì?','Điều gì khiến bạn thấy bình yên nhất?','Quyết định khó nhất bạn từng đưa ra là gì?','Có điều gì bạn tiếc vì chưa kịp nói với ai đó?','Bạn muốn được mọi người nhớ đến như thế nào?','Điều gì trong các mối quan hệ khiến bạn dễ tổn thương nhất?','Năm năm nữa nhìn lại, bạn mong hôm nay mình đã dám làm điều gì?'],
funny:['Kể lần xấu hổ nhất của bạn mà giờ nhớ lại vẫn buồn cười.','Trúng số 10 tỷ, việc điên rồ đầu tiên bạn làm là gì?','Biệt danh lầy nhất bạn từng bị đặt là gì?','Chọn một người trong nhóm để cùng kẹt trong thang máy 3 tiếng. Vì sao chọn người đó?','Món ăn kỳ cục nhất mà bạn lại thích là gì?','Nếu cuộc đời bạn là một bộ phim, tên phim sẽ là gì?','Tin nhắn gửi nhầm người nhục nhất của bạn là gì?','Siêu năng lực vô dụng nhất mà bạn muốn có?','Lần nói dối vụng về nhất của bạn là chuyện gì?','Chỉ được ăn một món suốt đời, bạn chọn món nào?','Thói quen kỳ quặc nhất của bạn khi ở một mình là gì?','Bài hát bạn hát hay nhất trong nhà tắm? Hát luôn một câu!','Sáng mai thức dậy thành người ngồi đối diện, việc đầu tiên bạn làm là gì?','Điều gì hồi nhỏ bạn tin là thật mà giờ thấy rất ngớ ngẩn?','Đặt tên cho quán ăn mới của cả nhóm, và món signature là gì?'],
friends:['Ai trong nhóm hay đến muộn nhất? Kể một kỷ niệm về chuyện đó.','Kể một điều bạn ngưỡng mộ ở người ngồi bên phải.','Ai trong nhóm hợp làm thủ lĩnh nhất? Vì sao?','Kỷ niệm đẹp nhất của bạn với nhóm này là gì?','Điều đầu tiên bạn nghĩ về người ngồi đối diện khi mới gặp?','Gặp chuyện buồn, bạn sẽ gọi cho ai trong nhóm đầu tiên?','Cả nhóm đi du lịch: ai là người lên kế hoạch, ai là người quên đồ?','Điều gì ở nhóm này khiến bạn muốn giữ mãi?','Nói một lời cảm ơn chân thành với một người trong nhóm.','Ai trong nhóm giữ bí mật tốt nhất?','Thói quen nhỏ nào của một người bạn khiến bạn thấy dễ thương?','Một điều bạn muốn cả nhóm cùng làm trước cuối năm?','Cả nhóm mở công ty, mỗi người sẽ làm vị trí gì?','Ai trong nhóm thay đổi nhiều nhất từ lúc mới quen? Theo hướng nào?','Điều bạn từng hiểu lầm về ai đó trong nhóm, đến sau này mới biết?'],
challenge:['Làm 10 cái squat ngay bây giờ trong lúc cả nhóm đếm to.','Nhìn thẳng vào mắt người đối diện 10 giây mà không được cười.','Hát một đoạn bài hát bất kỳ bằng giọng opera.','Cả nhóm chọn một biểu cảm, bạn giữ nguyên nó trong 20 giây.','Nói một câu về người bên trái bằng giọng MC bản tin thời sự.','Đọc to tin nhắn mới nhất bạn đã gửi (nếu bạn thấy ổn).','Kể tên 10 loại trái cây trong 10 giây.','Diễn tả một bộ phim nổi tiếng không dùng lời, cả nhóm đoán.','Đổi chỗ với một người và nhập vai họ trong 1 phút.','Kể một sự thật ít người biết về bạn trong đúng 3 câu.','Chụp một tấm selfie xấu nhất có thể rồi cùng xem lại.','Nói “Tôi yêu bạn” bằng giọng tức giận với người bạn chọn.','Đứng một chân 20 giây; nếu ngã, người bên cạnh ra lệnh cho bạn.','Quảng cáo một chiếc bút bi như thể nó là sản phẩm triệu đô.','Nhảy một điệu bất kỳ 15 giây, không cần nhạc.']
};
const DB='dem-chay-pho-v2',ST='deck',KEY='main';
const DEFAULT_CARD_IMAGES={
 deep:['DEEP 1.png','DEEP 2.png','DEEP 3.png','DEEP 4.png','DEEP 5.png','DEEP 6png.png','DEEP 7png.png','DEEP 8.png','DEEP 9.png','DEEP 10.png','DEEP 11.png','DEEP 12.png','DEEP 13.png','DEEP 14.png','DEEP 15.png'],
 funny:['FUNNY 1.png','FUNNY 2.png','FUNNY 3.png','FUNNY 4.png','FUNNY 5.png','FUNNY 6.png','FUNNY 7.png','FUNNY 8.png','FUNNY 9.png','FUNNY 10.png','FUNNY 11.png','FUNNY 12.png','FUNNY 13.png','FUNNY 14.png','FUNNY 15.png'],
 friends:['FRIENDS 1.png','FRIENDS 2.png','FRIENDS 3.png','FRIENDS 4.png','FRIENDS 5.png','FRIENDS 6.png','FRIENDS 7.png','FRIENDS 8.png','FRIENDS 9.png','FRIENDS 10.png','FRIENDS 11.png','FRIENDS 12.png','FRIENDS 13.png','FRIENDS 14.png','FRIENDS 15.png'],
 challenge:['CHALLENGE 1.png','CHALLENGE 2.png','CHALLENGE 3.png','CHALLENGE 4.png','CHALLENGE 5.png','CHALLENGE 6.png','CHALLENGE 7.png','CHALLENGE 8.png','CHALLENGE 9.png','CHALLENGE 10.png','CHALLENGE 11.png','CHALLENGE 12.png','CHALLENGE 13.png','CHALLENGE 14.png','CHALLENGE 15.png']
};
let dbp=null,data=null,persistent=true;
function openDb(){
 if(dbp)return dbp;
 dbp=new Promise(res=>{
  try{
   if(!window.indexedDB){persistent=false;return res(null)}
   const r=indexedDB.open(DB,1);
   r.onupgradeneeded=()=>r.result.createObjectStore(ST);
   r.onsuccess=()=>res(r.result);
   r.onerror=()=>{persistent=false;res(null)};
   r.onblocked=()=>{persistent=false;res(null)};
  }catch(e){persistent=false;res(null)}
 });
 return dbp;
}
function tx(db,mode,fn){
 return new Promise((res,rej)=>{
  const t=db.transaction(ST,mode),r=fn(t.objectStore(ST));
  t.oncomplete=()=>res(r&&r.result);
  t.onerror=()=>rej(t.error);
  t.onabort=()=>rej(t.error||new Error('Giao dịch bị hủy'));
 });
}
const uid=()=>'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
function defaults(){
 const cards=[];
 for(const t of THEMES)DEFAULTS[t.id].forEach((text,i)=>cards.push({id:'d-'+t.id+'-'+(i+1),theme:t.id,text,img:'img/'+DEFAULT_CARD_IMAGES[t.id][i]}));
 const backs={};THEMES.forEach(t=>backs[t.id]=null);
 return{v:2,cards,backs};
}
const themeIds=()=>THEMES.map(t=>t.id);
function valid(d){return d&&Array.isArray(d.cards)&&d.backs&&typeof d.backs==='object'}
async function load(){
 if(data)return data;
 const db=await openDb();let rec=null;
 if(db){try{rec=await tx(db,'readonly',s=>s.get(KEY))}catch(e){console.warn(e)}}
 data=valid(rec)?rec:defaults();
 data.cards=data.cards.filter(c=>c&&themeIds().includes(c.theme));
 for(const c of data.cards){
  const m=/^d-(deep|funny|friends|challenge)-(\d+)$/.exec(c.id||'');
  const n=m&&Number(m[2])-1;
  if(m&&(!c.img)&&DEFAULT_CARD_IMAGES[m[1]]&&DEFAULT_CARD_IMAGES[m[1]][n])c.img='img/'+DEFAULT_CARD_IMAGES[m[1]][n];
 }
 for(const t of THEMES)if(!(t.id in data.backs))data.backs[t.id]=null;
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
 return data;
}
async function save(){
 const db=await openDb();
 if(!db)return false;
 await tx(db,'readwrite',s=>s.put(data,KEY));
 return true;
}
async function compress(file,max,q){
 max=max||1100;q=q||.86;
 if(!/^image\//.test(file.type))throw new Error('“'+file.name+'” không phải file ảnh.');
 let bmp;
 try{bmp=await createImageBitmap(file)}catch(e){
  bmp=await new Promise((res,rej)=>{const u=URL.createObjectURL(file),i=new Image();i.onload=()=>{URL.revokeObjectURL(u);res(i)};i.onerror=()=>rej(new Error('Không đọc được ảnh “'+file.name+'”.'));i.src=u});
 }
 const w0=bmp.width||bmp.naturalWidth,h0=bmp.height||bmp.naturalHeight,k=Math.min(1,max/Math.max(w0,h0));
 const c=document.createElement('canvas');c.width=Math.round(w0*k);c.height=Math.round(h0*k);
 const x=c.getContext('2d');x.fillStyle='#0b0e1f';x.fillRect(0,0,c.width,c.height);x.drawImage(bmp,0,0,c.width,c.height);
 if(bmp.close)bmp.close();
 const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',q));
 if(!blob)throw new Error('Không nén được ảnh “'+file.name+'”.');
 return blob;
}
const urls=new WeakMap();
function url(b){if(!b)return'';if(typeof b==='string')return b;let u=urls.get(b);if(!u){u=URL.createObjectURL(b);urls.set(b,u)}return u}
const toDataUrl=async b=>{if(typeof b==='string')return toDataUrl(await (await fetch(b)).blob());return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(b)})};
const fromDataUrl=async s=>(await fetch(s)).blob();
async function exportJSON(){
 await load();
 const cards=await Promise.all(data.cards.map(async c=>({id:c.id,theme:c.theme,text:c.text||'',image:c.img?await toDataUrl(c.img):null})));
 const backs={};
 for(const t of THEMES)backs[t.id]=data.backs[t.id]?await toDataUrl(data.backs[t.id]):null;
 return JSON.stringify({schema:'dem-chay-pho-deck-v2',exportedAt:new Date().toISOString(),backs,cards});
}
async function importJSON(text){
 const j=JSON.parse(text);
 if(j.schema!=='dem-chay-pho-deck-v2'||!Array.isArray(j.cards))throw new Error('File JSON không đúng định dạng bộ bài.');
 const cards=[];
 for(const c of j.cards){
  if(!c||!themeIds().includes(c.theme))continue;
  cards.push({id:String(c.id||uid()),theme:c.theme,text:String(c.text||'').slice(0,400),img:c.image?await fromDataUrl(c.image):null});
 }
 const backs={};
 for(const t of THEMES)backs[t.id]=j.backs&&j.backs[t.id]?await fromDataUrl(j.backs[t.id]):null;
 await load();data.cards=cards;data.backs=backs;
 return save();
}
async function resetDefaults(){await load();const d=defaults();data.cards=d.cards;data.backs=d.backs;return save()}
window.DeckStore={THEMES,themeById:id=>THEMES.find(t=>t.id===id),load,save,compress,url,uid,exportJSON,importJSON,resetDefaults,get persistent(){return persistent}};
})();
