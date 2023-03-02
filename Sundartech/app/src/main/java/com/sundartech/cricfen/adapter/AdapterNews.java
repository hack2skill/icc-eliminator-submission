package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sundartech.cricfen.activity.ActivityNewsDetails;
import com.sundartech.cricfen.model.News;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.viewholder.ViewHolderNews;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterNews extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<News> mListNews;
    private Context mContext;

    public AdapterNews(Context mContext, List<News> mListNews) {
        this.mContext = mContext;
        this.mListNews = mListNews;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_news, parent, false);
        return new ViewHolderNews(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderNews) {
            populateItem((ViewHolderNews) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateItem(final ViewHolderNews holder, final int position) {

        Glide.with(mContext)
                .load(mListNews.get(position).getNewsThumbnail())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewNewsThumbnail);

        holder.mTextViewNewsTitle.setText(mListNews.get(position).getNewsTitle());
        holder.mTextViewNewsTime.setText(mListNews.get(position).getNewsTime());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, ActivityNewsDetails.class);
                //intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                //intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);
            }
        });

        /*holder.mCardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.itemView.performClick();
            }
        });*/

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
        return mListNews.size();
    }

    public void clear() {
        int size = mListNews.size();
        mListNews.clear();
        notifyItemRangeRemoved(0, size);
    }
}