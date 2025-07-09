import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// TypeScript interface
interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateVerificationToken(): string;
  generatePasswordResetToken(): string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Never return password in queries
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationToken: { 
    type: String,
    select: false
  },
  resetToken: { 
    type: String,
    select: false
  },
  resetTokenExpiry: { 
    type: Date,
    select: false
  }
}, { 
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.verificationToken;
      delete ret.resetToken;
      delete ret.resetTokenExpiry;
      return ret;
    }
  }
});

// Password hashing middleware
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance Methods
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '1d' }
  );
};

userSchema.methods.generateVerificationToken = function(): string {
  const token = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );
  this.verificationToken = token;
  return token;
};

userSchema.methods.generatePasswordResetToken = function(): string {
  const token = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET!,
    { expiresIn: '10m' }
  );
  this.resetToken = token;
  this.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return token;
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ verificationToken: 1 });
userSchema.index({ resetToken: 1 });
userSchema.index({ createdAt: 1 });

// Virtuals
userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin,
    isVerified: this.isVerified,
    createdAt: this.createdAt
  };
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;