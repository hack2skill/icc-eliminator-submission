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
import com.sundartech.cricfen.ActivityVideoDetails;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.model.Video;
import com.sundartech.cricfen.viewholder.ViewHolderVideo;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterVideo extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Video> mListVideo;
    private Context mContext;
    private int mLayout;

    public AdapterVideo(Context mContext, List<Video> mListVideo, int mLayout) {
        this.mContext = mContext;
        this.mListVideo = mListVideo;
        this.mLayout = mLayout;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(mLayout, parent, false);
        return new ViewHolderVideo(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderVideo) {
            populateItem((ViewHolderVideo) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateItem(final ViewHolderVideo holder, final int position) {

        Glide.with(mContext)
                .load(mListVideo.get(position).getVideoBackdrop())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewVideoBackdrop);

        holder.mTextViewVideoTitle.setText(mListVideo.get(position).getVideoTitle());
        holder.mTextViewVideoDuration.setText(mListVideo.get(position).getVideoDuration());
        holder.mTextViewVideoUpdatedTime.setText(mListVideo.get(position).getVideoUpdatedTime());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, ActivityVideoDetails.class);
                //intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                //intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);
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
        return mListVideo.size();
    }

    public void clear() {
        int size = mListVideo.size();
        mListVideo.clear();
        notifyItemRangeRemoved(0, size);
    }
}