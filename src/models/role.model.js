
export const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url : { type: String, required: true },
    role_level: { type: Number, required: true },
    status: { type: Boolean, default: true },
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted: { type: Boolean, default: false }, // Soft delete field

}, { timestamps: true });

// Soft delete function
roleSchema.methods.softDelete = function() {
    this.deleted = true;
    return this.save();
};

const Role = mongoose.model('Role', roleSchema);
export default Role;