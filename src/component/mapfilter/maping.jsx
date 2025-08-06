function Maping(){
   const similarItems=[
                 {
                id: "1a",
                name: "Hyderabadi Dum Biryani",
                price: 250,
                rating: 4.8,
                description: "Fragrant basmati rice layered with spicy marinated chicken, slow-cooked to perfection in dum style.",
                image: "swiggyClone/Hyderabadi-Dum-Biryani.jpg"
            },
            {
                id: "1b",
                name: "Lucknowi (Awadhi) Biryani",
                price: 230,
                rating: 4.6,
                description: "Mildly spiced biryani with saffron rice and tender chicken, cooked in traditional Awadhi style.",
                image: "swiggyClone/Lucknowi-(Awadhi)-Biryani.jpg"
            },
            {
                id: "1c",
                name: "Kolkata Biryani",
                price: 220,
                rating: 4.4,
                description: "Subtle flavors with boiled egg, soft potatoes, and juicy mutton – a true Bengali delight.",
                image: "swiggyClone/Kolkata-Biryani.jpg"
            },
            {
                id: "1d",
                name: "Malabar Chicken Biryani",
                price: 240,
                rating: 4.7,
                description: "Kerala-style biryani with coconut notes, fried onions, and aromatic spices.",
                image: "swiggyClone/Malabar-Chicken-Biryani.jpg"
            },
            {
                id: "1e",
                name: "Ambur Mutton Biryani",
                price: 260,
                rating: 4.5,
                description: "A Tamil Nadu specialty made with short-grain rice and spicy mutton masala.",
                image: "swiggyClone/Ambur-Mutton-Biryani.jpg"
            },
            {
                id: "1f",
                name: "Chettinad Biryani",
                price: 245,
                rating: 4.3,
                description: "Fiery biryani with a rich blend of Chettinad spices and roasted chicken.",
                image: "swiggyClone/Chettinad-Biryani.jpg"
            },
            {
                id: "1g",
                name: "Sindhi Biryani",
                price: 235,
                rating: 4.2,
                description: "A punchy biryani with green chilies, dried plums, and succulent meat pieces.",
                image: "swiggyClone/Sindhi-Biryani.jpg"
            },
            {
                id: "1h",
                name: "Veg Biryani",
                price: 180,
                rating: 4.1,
                description: "A wholesome mix of basmati rice and seasonal vegetables with mild spices.",
                image: "swiggyClone/Veg-Biryani.jpg"
            },
            {
                id: "1i",
                name: "Paneer Tikka Biryani",
                price: 200,
                rating: 4.3,
                description: "Cubes of grilled paneer in spicy marinade layered with saffron rice.",
                image: "swiggyClone/Paneer-Tikka-Biryani.jpg"
            },
            {
                id: "1j",
                name: "Fish Biryani",
                price: 270,
                rating: 4.4,
                description: "Coastal-style biryani with marinated fish and tangy, spicy rice base.",
                image: "swiggyClone/Fish-Biryani.jpg"
            }
      ]



      return(
        <div className="">
            {similarItems.map((item,index,price)=>(
                <div key={index}>
                   <h1>{item.name} price {item.price}</h1>
                </div>
            )              
            )}
        </div>
      )
}
export default Maping