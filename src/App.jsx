const initialProducts = [];

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        return (
            <tr>
                <td>{product.productName}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td><a href={product.image} target="_blank">View</a></td>
            </tr>
        );
    }
}
class ProductTable extends React.Component {
    render() {
        const productRows = this.props.products.map(product =>
            <ProductRow key={product.id} product={product} />
            );
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        );
    }
}
class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
            productName: form.productName.value, 
            price: form.price.value.replace("$", ""),
            category: form.category.value,
            image: form.image.value,
        }
        this.props.createProduct(product);
        form.productName.value = "", 
        form.price.value = "",
        form.category.value = "";
        form.image.value = "";
    }

      render() {
        return (
            <form name="productAdd" onSubmit={this.handleSubmit}>
            <label className="category-label" htmlFor="category">Category</label>
            <label className="price-label" htmlFor="price">Price Per Unit</label>

                <br></br>
                    <select className="category-input" name="category" id="category">
                        <option value="Shirts">Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Sweaters">Sweaters</option>
                        <option value="Accessories">Accessories</option>
                    </select>

                <input className="price-input" type="text" name="price" placeholder="Price" defaultValue="$" />
                <br></br><br></br>
                <label className="productName-label" htmlFor="productName">Product Name</label>
                <label className="image-label" htmlFor="image">Image URL</label>
                <br></br>
                <input className="productName-input" type="text" name="productName" placeholder="Product Name" />
                <input className="image-input" type="text" name="image" placeholder="Image" />
                <br></br><br></br>
                <button>Add Product</button>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = {products: [] };
        this.createProduct = this.createProduct.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        setTimeout(() => {
            this.setState({ products: initialProducts });
        }, 500);
    }
    createProduct(product) {
        product.id = this.state.products.length + 1;
        product.created = new Date();
        const newProductList = this.state.products.slice();
        newProductList.push(product);
        this.setState({ products: newProductList });
    }
    render() {
        return (
            <React.Fragment>
                <h1>My Company Inventory</h1>
                <h2>Showing all available products</h2>
                <hr></hr>
                <br></br>
                <ProductTable  products={this.state.products} />
                <hr />
                <h2>Add a new product to inventory</h2>
                <hr></hr>
                <br></br>
                <ProductAdd createProduct={this.createProduct} />
            </React.Fragment>
            
        );
    }
}
const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));