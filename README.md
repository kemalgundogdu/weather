# iWeather - Hava Durumu Web Sitesi

React ve Tailwind CSS ile geliştirilmiştir. Türkiyede ki şehirlerin hava durumu bilgilerini listelemeyi amaçlar. Şehir bilgilerini kaydedip, hızlı erişim olanağı sağlar.

Hava durumu bilgilerini **Openweathermap** sağlayıcısından temin eder.

Canlı: [Demoyu İncele](https://weather-blond-eta.vercel.app/)

## Kurulum
Repoyu klonladıktan sonra ilgili paketleri yüklemek için:

```terminal
npm install
```
Api bağlantınızın sorunsuz çalışabilmesi için, projenin kök dizinine .env dosyası oluşturup **Openweathermap** üzerinden aldığınız apiKey'i örnekte ki gibi yerleştirmelisiniz.

```terminal
REACT_APP_API_KEY={apiKey}
```
Projeyi ayağa kaldırmak için

```terminal
npm run start
```
Üretim için uygulamayı derleme klasörüne oluşturur.

```terminal
npm run build
```
