# DHURANDHAR // Game Boy Cafe — Jabalpur

A local gaming cafe web application designed with **Classic Game Boy (DMG-01) aesthetics** fused with the natural visual identity of **Dhuandhar Falls & Bhedaghat Marble Rocks** in Jabalpur, Madhya Pradesh.

---

## 🎮 Stations & Pricing Rules

| Station | Capacity | Hourly Rate | Per-Minute Rate (After 1h) |
| :--- | :--- | :--- | :--- |
| **8-Ball Pool** | 3 Tables | **₹120 / hr** | **₹2.00 / min** |
| **PlayStation 5** | 2 Consoles | **1 Player:** ₹80 / hr<br>**2 Players:** ₹100 / hr<br>**4 Players:** ₹150 / hr | **1P:** ₹1.33 / min<br>**2P:** ₹1.67 / min<br>**4P:** ₹2.50 / min |
| **Racing Simulator** | 1 Motion Cockpit | **₹150 / hr** | **₹2.50 / min** |

### ⏱️ Minute-Accurate Billing Formula
* **1-Hour Minimum:** Every station booking is charged for at least 1 base hour.
* **Per-Minute Calculation After 1 Hour:** Any playtime past 60 minutes is billed by the minute:
  $$\text{Total} = \text{Base 1h Cost} + (\text{Played Minutes} - 60) \times \frac{\text{Hourly Rate}}{60}$$
  * *Example:* 1 hour 20 minutes (80 mins) on a pool table $= 60\text{m } (₹120) + 20\text{m } \times ₹2.00 = \mathbf{₹160}$.

---

## 🌊 Jabalpur Visual Identity & Aesthetics

* **Color Palette:** Authentic Game Boy DMG-01 LCD greens (`#8bac0f`, `#9bbc0f`), deep forest greens (`#142117`), Bhedaghat marble rock off-white (`#ded9cb`), olive, and battery amber. Zero purple or neon blue.
* **Real Photography:** Uses real, licensed photographs of Dhuandhar Falls and Bhedaghat Marble Rocks (Narmada River) sourced from Wikimedia Commons with responsive mobile-first image crops.
* **Marble Geometry:** Bhedaghat rock-inspired framing, stone borders, and subtle CSS pixel mist accents.

---

## 📷 Photographic Attributions

1. **Dhuandhar Falls (Hero Visual):**
   * *Photograph:* Dhuandhar Waterfalls on the river Narmada near Jabalpur, India.
   * *Author:* Aksveer
   * *License:* Creative Commons Attribution-Share Alike 4.0 ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)) via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Dhuandhar_Waterfalls.jpg).

2. **Bhedaghat Marble Rocks (Secondary Panel):**
   * *Photograph:* Dhuandhar Water Fall & Marble Rocks at Bhedaghat.
   * *Author:* Sandyadav080
   * *License:* Creative Commons Attribution-Share Alike 3.0 ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)) via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bhedaghat_Marble_Rocks.jpg).

---

## 📱 Mobile Access (Local Wi-Fi)

To test on your mobile phone on the same Wi-Fi network:
```
http://192.168.29.58:5173/
```
Or locally on desktop:
```
http://localhost:5173/
```
