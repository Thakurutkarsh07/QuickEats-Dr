# QuickEats: Smart Food Ordering with Lead Scoring System

## 🍽️ About QuickEats
QuickEats is a modern food ordering platform designed to provide a seamless and personalized dining experience. It integrates AI-powered recommendations, a user-friendly interface, and an intelligent lead scoring system to enhance customer engagement and retention.

---

## 🚀 Key Features of QuickEats

### 1️⃣ **Smart Ordering System**
- Easily browse and order from a variety of restaurants.
- Real-time menu updates and pricing.
- AI-powered personalized recommendations based on past orders.

### 2️⃣ **Secure & Fast Payments**
- Integration with Razorpay for seamless transactions.
- Multiple payment methods: Credit/Debit cards, UPI, Wallets, and Net Banking.
- Instant refunds and cashback offers.

### 3️⃣ **AI-Powered Lead Scoring System**
- Assigns a lead score (0-100) to users based on engagement and activity.
- Categorizes users into **High**, **Medium**, or **Low** lead quality.
- Helps businesses prioritize and retain valuable customers.

### 4️⃣ **Real-Time Order Tracking**
- Live order tracking with estimated delivery time.
- SMS and push notifications for order status updates.

### 5️⃣ **Loyalty & Rewards Program**
- Earn points on every order.
- Exclusive discounts and offers for loyal customers.
- Referral bonuses for inviting friends.

### 6️⃣ **Advanced Admin Panel**
- Manage restaurants, menus, and pricing.
- Monitor customer engagement with lead scores.
- View detailed sales reports and analytics.

### 7️⃣ **Customer Support & Feedback System**
- 24/7 customer support with chatbot and live assistance.
- Feedback and review system to enhance service quality.

---

## 🔥 Lead Scoring Model Overview
The Lead Scoring System in QuickEats predicts the likelihood of a user becoming a loyal customer. It assigns a score based on various factors, helping businesses target high-value customers effectively.

### ✅ **How It Works:**
1. **Data Processing & Cleaning:**
   - Drops irrelevant fields.
   - Handles missing data.
   - Encodes categorical features.
2. **Feature Scaling:**
   - Uses StandardScaler to normalize numeric values.
3. **Model Training:**
   - Uses RandomForestClassifier with 100 trees.
   - Splits data into 80% training and 20% test.
4. **Prediction & Evaluation:**
   - Predicts the probability of conversion.
   - Evaluates model using accuracy and ROC-AUC.
5. **Lead Scoring:**
   - Formula: `Lead Score = (Probability × 100) + Feature Contribution`
   - Categorization:
     - **High:** Score ≥ 70
     - **Medium:** Score ≥ 40
     - **Low:** Score < 40
6. **Feature Importance:**
   - Identifies key factors influencing user engagement:
     - **Order frequency**
     - **Time spent on the app**
     - **Previous purchase history**
     - **User feedback & ratings**

---

## 🛠️ Admin Panel Features

### ✅ **Dashboard Overview:**
- View total sales, active users, and order statistics.
- Monitor customer engagement and lead scores.

### ✅ **Restaurant & Menu Management:**
- Add, update, and remove restaurant listings.
- Manage pricing, discounts, and availability.

### ✅ **Order & Delivery Tracking:**
- View real-time order status.
- Assign and manage delivery agents.

### ✅ **Customer Insights & Reports:**
- Analyze user behavior and engagement metrics.
- Generate reports for sales trends and customer retention.

---

## 🎯 Why QuickEats Stands Out
✅ AI-driven recommendations for personalized food choices.
✅ Smart lead scoring to enhance customer retention.
✅ Secure and seamless payment processing.
✅ Robust admin panel with analytics and reporting tools.
✅ User-friendly interface for hassle-free food ordering.

🚀 **QuickEats is revolutionizing the online food ordering experience!**

