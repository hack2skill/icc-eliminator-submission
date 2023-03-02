package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.Category;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.viewholder.ViewHolderCategory;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterCategory extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Category> mListCategory;
    private Context mContext;

    public AdapterCategory(Context mContext, List<Category> mListCategory) {
        this.mContext = mContext;
        this.mListCategory = mListCategory;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_category_small, parent, false);
        return new ViewHolderCategory(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderCategory) {
            populateCastItem((ViewHolderCategory) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateCastItem(final ViewHolderCategory holder, final int position) {

        holder.mImageViewCategoryImage.setImageResource(mListCategory.get(position).getCategoryIcon());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

        holder.mLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.itemView.performClick();
            }
        });

    }

    public static int getResId(String resName, Class<?> c) {

        try {
            Field idField = c.getDeclaredField(resName);
            return idField.getInt(idField);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int getItemCount() {
        return mListCategory.size();
    }

    public void clear() {
        int size = mListCategory.size();
        mListCategory.clear();
        notifyItemRangeRemoved(0, size);
    }
}