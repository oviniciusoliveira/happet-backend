import PetHome from "./../models/PetHome";
import imagesView from "./images_view";

export default {
  render(petHome: PetHome) {
    return {
      id: petHome.id,
      name: petHome.name,
      latitude: petHome.latitude,
      longitude: petHome.longitude,
      about: petHome.about,
      instructions: petHome.instructions,
      opening_hours: petHome.opening_hours,
      open_on_weekends: petHome.open_on_weekends,
      is_accepted: petHome.is_accepted,
      whatsapp: petHome.whatsapp,
      images: imagesView.renderMany(petHome.images),
    };
  },

  renderMany(petHomes: PetHome[]) {
    return petHomes.map((petHome) => this.render(petHome));
  },
};
