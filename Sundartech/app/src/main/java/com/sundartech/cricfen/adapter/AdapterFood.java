package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sundartech.cricfen.model.Food;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.viewholder.ViewHolderFood;

import java.util.List;

public class AdapterFood extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Food> mListFood;
    private Context mContext;

    public AdapterFood(Context mContext, List<Food> mListFood) {
        this.mContext = mContext;
        this.mListFood = mListFood;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_food, parent, false);
        return new ViewHolderFood(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderFood) {
            populateItem((ViewHolderFood) holder, position);
        }
    }

    @SuppressLint({"ResourceType", "SetTextI18n"})
    private void populateItem(final ViewHolderFood holder, final int position) {

        holder.mTextViewFoodName.setText(mListFood.get(position).getFoodName());
        holder.mTextViewFoodPrice.setText(mListFood.get(position).getFoodPrice());

        holder.mTextViewFoodRate.setText(mListFood.get(position).getFoodRating());

        Glide.with(mContext)
                .load(mListFood.get(position).getFoodImage())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewFoodImage);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListFood.size();
    }

    public void clear() {
        int size = mListFood.size();
        mListFood.clear();
        notifyItemRangeRemoved(0, size);
    }
}