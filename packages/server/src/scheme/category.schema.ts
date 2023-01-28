import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CategoryType } from 'src/types/category.dto';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop({ unique: true })
  name: string;

  @Prop({ default: 'category' })
  type: CategoryType;

  @Prop({ default: false })
  private: boolean;

  @Prop()
  password: string;

  @Prop({ type: SchemaTypes.Mixed })
  meta?: object;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
