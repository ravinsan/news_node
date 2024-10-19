import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    url: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
    order: { type: Number, required: true },
    icon: { type: String, required: true },
    status: { type: Boolean, default: true },
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted: { type: Boolean, default: false }, // Soft delete field
}, { timestamps: true });

// Query only non-deleted items by default
menuSchema.pre(/^find/, function(next) {
    this.where({ deleted: false });
    next();
});

// Soft delete function
menuSchema.methods.softDelete = function() {
    this.deleted = true;
    return this.save();
};

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
