import { observable, runInAction, configure, makeObservable, action, computed } from "mobx"
import ApplicationService, { ISlide } from "../api/applications";
configure({ enforceActions: "observed" });

class ApplicationStore {

    slides:ISlide[] = []
    applicationService?:ApplicationService = undefined;

    constructor() {
        this.applicationService = new ApplicationService();
        makeObservable(this, {
            slides: observable
        })
    }

    async getSlides()  {
        try {
        this.applicationService?.getCategories().then(result=>{
            runInAction(()=>{
                this.slides = result.data
            })
        });
        }
        catch (e) {
            console.log(e);
        }
    }


}



export default ApplicationStore;