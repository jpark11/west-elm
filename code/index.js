/*jshint esversion: 6 */

let menuItems = ["COOKWARE", "COOKS' TOOLS", "CUTLERY", "ELECTRICS", "BAKEWARE", "FOOD", "TABLETOP & BAR", "HOMEKEEPING", "OUTDOOR", "SALE"];
let itemData = {
    "title": "Williams-Sonoma Classic Apron",
    "color": ["French Blue", "Black Striped", "Green Striped", "Soft Red"],
    "description": "A generously sized apron is a necessity in any kitchen, and ours will brighten yours with lively color. Sewn of thick cotton, it can be personalized or monogrammed with up to nine characters, all the same height embroidered in your choice of color. An apron of this quality makes a welcome gift for any cook.",
    "moreInfo": ["Durable 100% cotton construction.", "Adjustable neckband ensures a good fit", "Roomy front pockets hold small tools", "Machine-wash."],
    "price": "$19.95",
    "productImages": ["assets/product-large-a.jpg", "assets/product-large-b.jpg", "assets/product-large-c.jpg", "assets/product-large-d.jpg"],
    "productThumbnails": ["assets/product-small-a.jpg", "assets/product-small-b.jpg", "assets/product-small-c.jpg", "assets/product-small-d.jpg"]
};
let chosenItemIndex = 0;

createMenu = (menuItems) => {
    let menuDiv = document.getElementById("menulist");
    menuItems.map(item => {
        let naviDiv = document.createElement("div");
        naviDiv.setAttribute("id", "menu-navi-div");

        let li = document.createElement("li");
        li.className = "nav-item dropdown";

        let navLinkA = document.createElement("a");
        li.appendChild(navLinkA);
        navLinkA.className = "nav-link";
        navLinkA.setAttribute("data-toggle", "dropdown");
        navLinkA.setAttribute("href", "#");
        navLinkA.setAttribute("role", "button");
        navLinkA.setAttribute("aria-haspopup", "true");
        navLinkA.setAttribute("aria-expanded", "false");
        navLinkA.innerHTML = item;

        let ddDiv = document.createElement("div");
        li.appendChild(ddDiv);
        ddDiv.className = "dropdown-menu";

        let ddItemA = document.createElement("a");
        ddDiv.appendChild(ddItemA);
        ddDiv.setAttribute("href", "#");
        ddItemA.innerHTML = "More " + item;


        menuDiv.appendChild(naviDiv);
        naviDiv.appendChild(li);
    });

    //create home nav-link
    let homeMenuDiv = document.createElement("div");
    homeMenuDiv.setAttribute("id", "menu-home-div");

    let homeli = document.createElement("li");
    homeli.setAttribute("id", "menu-home");
    homeli.className = "nav-item";

    let homeA = document.createElement("a");
    homeA.className = "nav-link";
    homeA.setAttribute("href", "#");
    homeA.innerHTML = "Williams-Sonoma Home";


    menuDiv.appendChild(homeMenuDiv);
    homeMenuDiv.appendChild(homeli);
    homeli.appendChild(homeA);
};

createProductContainer = (data) => {
    let product = document.getElementById("product");

    let imagesDiv = document.getElementById("product-images");
    let itemBigImage = document.getElementById("itemBigImage");
    let itemThumbnails = document.getElementById("itemThumbnails");

    let infoDiv = document.getElementById("product-info");
    let itemInfo = document.getElementById("itemInfo");
    let itemTitle = document.getElementById("itemTitle");
    let itemDescription = document.getElementById("itemDescription");
    let itemPrice = document.getElementById("itemPrice");
    let itemCollapsibles = document.getElementById("itemCollapsibles");

    //Images
    let bigImage = document.createElement("img");
    bigImage.setAttribute("id", "bigImage");
    bigImage.src = itemData.productImages[chosenItemIndex];
    itemBigImage.appendChild(bigImage);

    let thumbnails = itemData.productThumbnails;
    thumbnails.map((thumbnail, index) => {
        let thumb = document.createElement("img");
        thumb.setAttribute("onclick", "thumbnailClick(this.id)");
        thumb.className = "thumbnail";
        thumb.setAttribute("id", index);
        thumb.src = thumbnail;
        if (thumbnail === thumbnails[chosenItemIndex]) {
            thumb.style.border = "2px solid #000";
        }
        itemThumbnails.appendChild(thumb);
    });

    //Info
    itemTitle.innerHTML = itemData.title + ", " + itemData.color[chosenItemIndex];

    itemDescription.innerHTML = itemData.description;
    let moreInfo = itemData.moreInfo;
    if (moreInfo) {
        let moreInfoList = document.createElement("ul");
        itemDescription.appendChild(moreInfoList);
        moreInfo.map(info => {
            let infoLi = document.createElement("li");
            infoLi.innerHTML = info;
            moreInfoList.appendChild(infoLi);
        });
    }

    itemPrice.innerHTML = itemData.price;

    let quantityInput = document.createElement("input");
    quantityInput.setAttribute("id", "itemQuantity");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("value", "1");
    quantityInput.setAttribute("name", "quantity");


    let addToCartButton = document.createElement("button");
    addToCartButton.setAttribute("id", "itemAddToCart");
    addToCartButton.innerHTML = "ADD TO CART &#9654;";

    let beginningHr = document.createElement("hr");
    let endHr = document.createElement("hr");
    beginningHr.className = "boldHR";
    endHr.className = "boldHR";



    product.appendChild(infoDiv);
    infoDiv.appendChild(itemInfo);
    itemInfo.appendChild(itemTitle);
    itemInfo.appendChild(itemDescription);
    itemInfo.appendChild(itemPrice);
    itemInfo.appendChild(quantityInput);
    itemInfo.appendChild(addToCartButton);
    itemInfo.appendChild(beginningHr);
    infoDiv.appendChild(itemCollapsibles);
    infoDiv.appendChild(endHr);
};

thumbnailClick = (id) => {
    chosenItemIndex = id;
    let thumbnails = document.getElementsByClassName("thumbnail");

    //updating UI with Javascript. In real app, I would link to a separate subpage with a unique URL. 
    document.getElementById('bigImage').src = itemData.productImages[chosenItemIndex];
    document.getElementById('itemTitle').innerHTML = itemData.title + ", " + itemData.color[chosenItemIndex];
    document.getElementById('activeBreadcrumb').innerHTML = itemData.title + ", " + itemData.color[chosenItemIndex];

    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.border = "none";
    }
    document.getElementById(id).style.border = "2px solid #000";
};

collapsibleClick = (elt) => {
    swapimg(elt.childNodes[1].childNodes[1]);
    swaptxt(elt.childNodes[1].childNodes[3]);
};

swapimg = (elt) => {
    if (elt.src === "http://localhost:8000/code/assets/arrow-collapsed.png") {
        elt.src = "http://localhost:8000/code/assets/arrow-expanded.png";
    } else {
        elt.src = "http://localhost:8000/code/assets/arrow-collapsed.png";
    }
};

swaptxt = (elt) => {
    if (elt.innerHTML === "COLLAPSED") {
        elt.innerHTML = "EXPANDED";
    } else {
        elt.innerHTML = "COLLAPSED";
    }
}


createMenu(menuItems);
createProductContainer(itemData);