package com.sundartech.cricfen.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.model.Story;
import com.sundartech.cricfen.viewholder.ViewHolderStory;

import java.util.List;

public class AdapterStory extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Story> mListStory;
    private Context mContext;

    public AdapterStory(Context mContext, List<Story> mListStory) {
        this.mContext = mContext;
        this.mListStory = mListStory;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_story, parent, false);
        return new ViewHolderStory(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderStory) {
            populateCastItem((ViewHolderStory) holder, position);
        }
    }

    private void populateCastItem(final ViewHolderStory holder, final int position) {

        Glide.with(mContext)
                .load(mListStory.get(position).getStoryImage())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mMatchImage);

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

    @Override
    public int getItemCount() {
        return mListStory.size();
    }

    public void clear() {
        int size = mListStory.size();
        mListStory.clear();
        notifyItemRangeRemoved(0, size);
    }
}