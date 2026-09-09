// Local static database for Sakshi Nursery available plants
// One high-quality plant per category, completely serverless.

import CauliflowerImg from "../../images/Cauliflower.jpg";
import PapayaImg from "../../images/pappya.jpg";
import BrinjalImg from "../../images/brinjal.jpg";
import CabbageImg from "../../images/Slidebar_4.jpg"; // veer cabbage
import BottleGourdImg from "../../images/bhopala.jpg";
import BitterGourdImg from "../../images/karle.png";
import TomatoImg from "../../images/aryaman.jpg";
import ChilliImg from "../../images/chilli.jpg";
import CapsicumImg from "../../images/shimala.jpg";
import WatermelonImg from "../../images/tarbuj.jpg";
import MuskmelonImg from "../../images/kharbuj.jpg";
import CucumberImg from "../../images/kakdi.jpg";
import SmallCucumberImg from "../../images/samllkakdi.jpg";
import DrumstickImg from "../../images/shevga.jpg";
import MerigoldImg from "../../images/marigold.png";

export const plantsData = [
  {
    id: 1,
    name: "Cauliflower Snow King",
    price: 1.00,
    category: "Cauliflower",
    status: "AVAILABLE",
    stockQuantity: 45000,
    averageRating: 4.8,
    images: [CauliflowerImg],
    description: `Cauliflower Snow King is a high-quality, early-maturing hybrid variety. It produces compact, bright white, and beautifully shaped heads.

Features:
- Harvesting Time: Ready for harvest in 60 to 65 days after transplanting.
- Curd Weight: Average 1.0 to 1.5 kg per head.
- Disease Resistance: Heat-tolerant and resistant to leaf blight.
- Shelf Life: Excellent for transportation and long-term storage.`,
    reviews: [
      { username: "Vijay Khaire", rating: 5, comment: "The saplings are very fresh and healthy. 100% germination after planting!" },
      { username: "Rahul Patil", rating: 4, comment: "Received top-quality cauliflower plants. Will definitely buy again next season." }
    ]
  },
  {
    id: 2,
    name: "Red Lady Papaya 786",
    price: 15.00,
    category: "Papaya",
    status: "AVAILABLE",
    stockQuantity: 25000,
    averageRating: 4.9,
    images: [PapayaImg],
    description: `Taiwan's famous Red Lady 786 Papaya is a highly popular hybrid variety. Fruit bearing starts close to the ground, yielding heavy production per tree.

Features:
- Fruit Color: Yellowish-green skin with deep red-orange sweet pulp inside.
- Fruit Weight: Average 1.5 to 2.0 kg per fruit.
- Flavor: Very sweet and aromatic.
- Yield: Fruits ready for harvest in 8 to 9 months. Yields 50 to 80 kg per plant.`,
    reviews: [
      { username: "Amol Deshmukh", rating: 5, comment: "Planted 6 months ago, fruiting has started very well." },
      { username: "Suresh Shinde", rating: 5, comment: "Best papaya variety with excellent germination rate." }
    ]
  },
  {
    id: 3,
    name: "Brinjal Ajay Hybrid",
    price: 1.00,
    category: "Brinjal",
    status: "AVAILABLE",
    stockQuantity: 30000,
    averageRating: 4.7,
    images: [BrinjalImg],
    description: `Brinjal Ajay Hybrid is an outstanding variety well-suited for varied weather conditions. It is famous for its thorny, attractive dark purple fruits.

Features:
- Fruit Color: Shiny dark purple with green calyx and soft thorns.
- Shape: Round and medium-large size.
- Harvesting Time: First harvest begins 55 to 60 days after transplanting.
- Disease Resistance: Good resistance to shoot borer and wilt disease.`,
    reviews: [
      { username: "Ganesh Patil", rating: 4, comment: "Received very good brinjal plants. Got a great market price for the produce." }
    ]
  },
  {
    id: 4,
    name: "Cabbage Veer 333",
    price: 0.90,
    category: "Cabbage",
    status: "AVAILABLE",
    stockQuantity: 50000,
    averageRating: 4.8,
    images: [CabbageImg],
    description: `Cabbage Veer 333 is a high-yielding hybrid variety known for its firm, uniform, and round heads.

Features:
- Fast Growth: Ready for harvest within 60-65 days after transplanting.
- Head Weight: Average 1.5 to 2.5 kg.
- Appearance: Dark green, smooth, and compact leaves.
- Disease Resistance: Protects against black rot and top burn.`,
    reviews: [
      { username: "Nitin Kadam", rating: 5, comment: "Cabbage heads grew very firm and high quality. Excellent seeds." }
    ]
  },
  {
    id: 5,
    name: "Bottle Gourd Warad",
    price: 7.00,
    category: "Bottle Gourd",
    status: "AVAILABLE",
    stockQuantity: 15000,
    averageRating: 4.6,
    images: [BottleGourdImg],
    description: `Bottle Gourd Warad is a premium variety recognized for its long, straight, and attractive light-green fruits.

Features:
- Fruit Shape: Cylindrical, 40 to 50 cm long.
- Harvesting Time: Ready for harvest in 50 to 55 days after transplanting.
- Taste: Tender, soft, and delicious pulp.
- Highlight: Performs exceptionally well even with low water and high heat.`,
    reviews: [
      { username: "Sunil More", rating: 5, comment: "Excellent germination capacity and healthy vine growth." }
    ]
  },
  {
    id: 6,
    name: "Bitter Gourd Karishma",
    price: 1.00,
    category: "Bitter Gourd",
    status: "AVAILABLE",
    stockQuantity: 20000,
    averageRating: 4.7,
    images: [BitterGourdImg],
    description: `Bitter Gourd Karishma is a high-demand hybrid variety known for its dark green, sharp-ridged fruits.

Features:
- Fruit Size: Medium-long (20-22 cm) with attractive dark green color.
- Harvesting Time: Harvesting starts 55 days after transplanting.
- Disease Resistance: High resistance to powdery and downy mildew.
- Yield: Abundant flowering and fruit setting.`,
    reviews: [
      { username: "Prasad Joshi", rating: 4, comment: "High market demand for this bitter gourd. Fetches great market prices." }
    ]
  },
  {
    id: 7,
    name: "Tomato Aryaman Hybrid",
    price: 1.50,
    category: "Tomato",
    status: "AVAILABLE",
    stockQuantity: 60000,
    averageRating: 4.9,
    images: [TomatoImg],
    description: `Tomato Aryaman is a premier hybrid variety known for high yield, vibrant red color, and excellent firmness for long-distance transport.

Features:
- Fruit Weight: Average 90 to 120 grams.
- Appearance: Deep red, smooth, and firm skin.
- Shelf Life: Excellent transport survival without damage, long shelf life.
- Disease Resistance: Strong resistance against fungal and viral diseases.`,
    reviews: [
      { username: "Sandip Sonawane", rating: 5, comment: "Tomato shape and color are superb. Zero damage during transit." }
    ]
  },
  {
    id: 8,
    name: "Chilli Armar Hybrid",
    price: 1.50,
    category: "Chilli",
    status: "AVAILABLE",
    stockQuantity: 35000,
    averageRating: 4.8,
    images: [ChilliImg],
    description: `Armar Chilli is a premium hybrid variety producing medium-long, dark green, and attractive chillies.

Features:
- Chilli Length: 10 to 12 cm.
- Appearance: Dark green with shiny smooth skin.
- Pungency: Medium to high spice level, ideal for fresh market and drying.
- Harvesting Time: Ready for picking 65 to 70 days after transplanting.`,
    reviews: [
      { username: "Kiran Gite", rating: 5, comment: "Abundant chilli fruiting, healthy plant height and growth." }
    ]
  },
  {
    id: 9,
    name: "Capsicum Shimla Green",
    price: 2.50,
    category: "Capsicum",
    status: "AVAILABLE",
    stockQuantity: 18000,
    averageRating: 4.7,
    images: [CapsicumImg],
    description: `Capsicum (Shimla Mirch) Green King produces four-lobed, glossy, blocky green bell peppers.

Features:
- Fruit Weight: Average 150 to 180 grams.
- Skin: Thick, shiny green wall.
- Yield: Continuous fruit setting, suitable for polyhouse and open farming.
- Market Value: High market demand due to superior weight and glossy finish.`,
    reviews: [
      { username: "Ramesh Pawar", rating: 4, comment: "Plants arrived very healthy. Capsicum size and shine are wonderful." }
    ]
  },
  {
    id: 10,
    name: "Watermelon Bahubali",
    price: 2.80,
    category: "Watermelon",
    status: "AVAILABLE",
    stockQuantity: 40000,
    averageRating: 4.9,
    images: [WatermelonImg],
    description: `Watermelon Bahubali is a heavy-yielding hybrid variety famous for its large size and dark green striped fruits.

Features:
- Fruit Weight: Average 5 to 8 kg.
- Flesh: Deep red, juicy, and extremely sweet (high TSS).
- Rind: Thick and tough rind, ideal for long-distance transportation.
- Crop Duration: Harvest-ready in 70 to 75 days after planting.`,
    reviews: [
      { username: "Sachin Wagh", rating: 5, comment: "Bahubali watermelon turned out heavy and sweet just like its name. Fantastic taste!" }
    ]
  },
  {
    id: 11,
    name: "Muskmelon Kundan",
    price: 2.00,
    category: "Muskmelon",
    status: "AVAILABLE",
    stockQuantity: 20000,
    averageRating: 4.6,
    images: [MuskmelonImg],
    description: `Muskmelon Kundan is an attractive netted yellow melon celebrated for its sweet, aromatic, and delicious orange pulp.

Features:
- Fruit Weight: 1.2 to 1.8 kg.
- Pulp: Thick, deep orange, and sweet flesh.
- Harvesting Time: Ready in 65 to 70 days after planting.
- Market Value: Commands high market demand and premium pricing.`,
    reviews: [
      { username: "Dnyaneshwar Mali", rating: 4, comment: "Muskmelon saplings were strong with near-zero mortality." }
    ]
  },
  {
    id: 12,
    name: "Cucumber Malini",
    price: 2.00,
    category: "Cucumber",
    status: "AVAILABLE",
    stockQuantity: 25000,
    averageRating: 4.7,
    images: [CucumberImg],
    description: `Cucumber Malini Hybrid is a farmer favorite for growing straight, crisp, light-green cucumbers.

Features:
- Fruit Size: 18 to 22 cm long, perfectly straight.
- Taste: Sweet, crisp, non-bitter flesh.
- Harvesting Time: First harvest begins in just 40 to 45 days.
- Growth: Rapid and vigorous vine development.`,
    reviews: [
      { username: "Bharat Jagtap", rating: 5, comment: "First harvest on day 45! The cucumbers taste crisp and sweet." }
    ]
  },
  {
    id: 13,
    name: "Small Cucumber (Gherkin) Special",
    price: 2.00,
    category: "Small Cucumber",
    status: "AVAILABLE",
    stockQuantity: 15000,
    averageRating: 4.5,
    images: [SmallCucumberImg],
    description: `Small Cucumber Hybrid is highly sought-after in urban markets for salads and pickling.

Features:
- Fruit Size: Compact, deep green, with crunchy texture.
- Harvesting Time: Ready for harvest in 45 days.
- Taste: Very fresh and juicy flavor.
- Shelf Life: Stays fresh longer after picking.`,
    reviews: [
      { username: "Vijay Patil", rating: 4, comment: "Fruiting of small cucumbers is excellent. Successful planting!" }
    ]
  },
  {
    id: 14,
    name: "Drumstick PKM-1",
    price: 1.50,
    category: "Drumstick",
    status: "AVAILABLE",
    stockQuantity: 10000,
    averageRating: 4.8,
    images: [DrumstickImg],
    description: `Drumstick PKM-1 is considered one of the highest-yielding moringa varieties globally, known for thick, pulpy pods.

Features:
- Pod Length: 65 to 75 cm long, fleshy and tasty.
- Early Yield: Starts producing pods within 6 to 7 months after planting.
- Year-Round Harvest: Yields 2 harvest seasons per year.
- Plant Height: Medium height, easy to manage with pruning.`,
    reviews: [
      { username: "Sharad Pawar", rating: 5, comment: "PKM-1 drumstick plants are very healthy. Growing vigorously after 4 months!" }
    ]
  },
  {
    id: 15,
    name: "Marigold Gold Coin",
    price: 3.00,
    category: "Merigold",
    status: "AVAILABLE",
    stockQuantity: 30000,
    averageRating: 4.9,
    images: [MerigoldImg],
    description: `Marigold Gold Coin is a hybrid flower variety famous for its large, dense, golden-orange blossoms, in high demand during festival seasons.

Features:
- Flower Size: Large, tight, ball-shaped blooms.
- Color: Vibrant yellow and golden-orange.
- Harvesting Time: Ready for flower picking in 50 to 55 days.
- Shelf Life: Flowers stay fresh long after harvest, perfect for transportation.`,
    reviews: [
      { username: "Dinesh Bhoir", rating: 5, comment: "Marigold flowers turned out big and lush. Fetched top prices during the festive market!" }
    ]
  }
];
