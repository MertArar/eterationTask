Bu proje Eteration adlı şirketin gerçekleştirmiş olduğu teknik mülakat projesidir.

## Genel Bilgiler

İlk olarak geliştirme sunucusunu yüklemeniz gerekiyor.

```bash
Terminalde aşağıdaki adımlar takip edilmelidir.

1- "npm install"

2- "npm start" komutuyla projemizi çalıştırmamız gerekiyor.

Sonucu görmek icin tarayıcınızla [http://localhost:3000] açın.

```

## Proje Detayları

```bash

1- Proje bir e-ticaret sitesidir.

2- Ürünler APIden çekilerek listelenir.

3- Listelenen ürünler filteleme özelliği ile sıralanabilir ve kategorize edilinebilir.

4- Arama özelliği sayesinde ürünler aranılabilirdir.

5- "Ürün Detay" sayfası seçilen ürünlerin detaylarını gösterir.

6- "Ürün Sepeti" alanı dinamiktir. Buna bağlı olarak "Total Price" alanı da değişkenlik gösterir.


```

## Teknik Detaylar

```bash

1- Proje React.js adlı web geliştirme çerçevesi ile geliştirilmiştir.

2- Javascipt programlama dili ile geliştirilmiştir.

3- Tasarım kısmının kodlanması Tailwindcss ile gerçekleşmiştir.

4- Clean Architecture kurallarına uygun şekilde geliştirilmiştir.

5- Proje "Model–view–viewmodel(MVVM)" mimari patternine uyularak yazılmıştır.

6- Spesifik bölümler yorum satırlarıyla belirtilmiştir.

```

Önemli not: API'nin içindeki ürünlerin, ürün ismi ile ürün markası uyuşmuyor. Bu sebeple anasayfadaki "Brands" filtesi ürünleri isimlerine göre filtreleme geliştirdim. Böylelikle mantıksal olarak doğru çalışmış oldu. Ürün modellerinde de uyuşmazlık söz konusu. API'yi incelerseniz ürün modellerinin de yine aynı şekilde ürünün ismiyle ve markasıya uyuşmazlık yaşadığını görebilirsiniz. "Models" filtesinde ürün modeline göre filteleniyor. Bu tamamen API'deki mantık hatasından meydana gelen bir özellik. Değerlendirme yaparken bunları göz önünde bulundurursanız sevinirim.
