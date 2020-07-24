import App from './App.svelte';

const app = new App({
	target: document.body,
	// Props is where you can place alter the configuration of 
	// the app. These values will be exported to App.svelte
	//TODO: put card data objects in props to populate cards in
	// App.svelte
	props: {     
		// data for the foooter             
		footerData: [
			{ id: 1, url: "#team", label: "team" },
			{ id: 2, url: "#work", label: "work" }
		  ],
		// these variables configure the responsive cropping of the background
		croppedRight: "900",
		croppedLeft: "500",
		croppedRightMore: "700",
		croppedLeftMore: "300",
		noCropRight: "1920",
		noCropLeft: "0"   			  
	}
});

export default app;