package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.model.News;
import com.sundartech.cricfen.model.Video;
import com.sundartech.cricfen.viewholder.ViewHolderRelatedNews;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterRelatedNews extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<News> mListRelatedNews;
    private Context mContext;

    public AdapterRelatedNews(Context mContext, List<News> mListRelatedNews) {
        this.mContext = mContext;
        this.mListRelatedNews = mListRelatedNews;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_related_news, parent, false);
        return new ViewHolderRelatedNews(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderRelatedNews) {
            populateItem((ViewHolderRelatedNews) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateItem(final ViewHolderRelatedNews holder, final int position) {

        Glide.with(mContext)
                .load(mListRelatedNews.get(position).getNewsThumbnail())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewNewsThumbnail);

        holder.mTextViewNewsTitle.setText(mListRelatedNews.get(position).getNewsTitle());
        holder.mTextViewNewsEventName.setText(mListRelatedNews.get(position).getNewsEvent());
        holder.mTextViewNewsTime.setText(mListRelatedNews.get(position).getNewsTime());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

        holder.mCardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.itemView.performClick();
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListRelatedNews.size();
    }

    public void clear() {
        int size = mListRelatedNews.size();
        mListRelatedNews.clear();
        notifyItemRangeRemoved(0, size);
    }
}